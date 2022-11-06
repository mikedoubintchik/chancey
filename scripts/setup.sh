npm install -g firebase-tools
curl -s "https://get.sdkman.io" | bash
sdk install java 11.0.2-open
curl -sSL https://get.rvm.io | bash -s stable --ruby
source ~/.rvm/scripts/rvm
gem install bundler
bundle update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
nvm install 16
MATCH_PASSWORD=chancey bundle exec fastlane match development --readonly && bundle exec fastlane match appstore