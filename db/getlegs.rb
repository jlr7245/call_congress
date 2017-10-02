require 'Httparty'
require 'JSON'

class Collection
  attr_accessor :house, :senate
  def initialize(house, senate)
    @house = house
    @senate = senate
  end
end

class GetLegislators
  @propublica = Rails.application.secrets.propublica_api_key

  def self.get_response
    senate = JSON.parse(HTTParty.get("https://api.propublica.org/congress/v1/115/senate/members.json", headers: { "X-API-Key": @propublica }).to_s)["results"][0]["members"]
    house = JSON.parse(HTTParty.get("https://api.propublica.org/congress/v1/115/house/members.json", headers: { "X-API-Key": @propublica }).to_s)["results"][0]["members"]
    Collection.new(house, senate)
  end

  def self.return_dbready_objects
    legislators = self.get_response
    house_ready = legislators.house.map do |legislator| 
      self.arrange_legislator(legislator, :house)
    end
    senate_ready = legislators.senate.map do |legislator|
       self.arrange_legislator(legislator, :senate)
    end
    { house: house_ready, senate: senate_ready }
    #senate_ready
  end

  def self.arrange_legislator(obj, current)
   more_details = JSON.parse(HTTParty.get(obj["api_uri"], headers: { "X-API-Key": @propublica }).to_s)["results"][0]
   puts more_details["most_recent_vote"]
    {
      first_name: obj["first_name"],
      middle_name: obj["middle_name"],
      last_name: obj["last_name"],
      full_name: "#{obj["first_name"]} #{(obj["middle_name"]) ? obj["middle_name"] : ''} #{obj["last_name"]}",
      bio: '',
      date_of_birth: Date.parse(obj["date_of_birth"]),
      gender: more_details["gender"],
      chamber: current,
      url: obj["url"],
      govtrack_id: obj["govtrack_id"],
      cspan_id: obj["cspan_id"],
      in_office: obj["in_office"],
      leadership_role: obj["leadership_role"],
      current_party: obj["party"],
      most_recent_vote: (more_details["most_recent_vote"] && more_details["most_recent_vote"] != "") ? Date.parse(more_details["most_recent_vote"]) : nil,
      state: obj["state"],
      district: (current == :senate) ? 0 : obj["district"],
      address: obj["office"],
      phone: obj["phone"],
      fax: obj["fax"],
      twitter_account: obj["twitter_account"],
      facebook_account: obj["facebook_account"],
      youtube_account: obj["youtube_account"],
      api_url: obj["api_uri"]
    }
  end

end

puts GetLegislators.return_dbready_objects