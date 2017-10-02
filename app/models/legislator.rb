class Legislator < ApplicationRecord
  has_many :watched_legislators
  has_many :users, through: :watched_legislators
end
