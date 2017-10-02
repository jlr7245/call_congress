class WatchedLegislator < ApplicationRecord
  belongs_to :user
  belongs_to :legislator
end
