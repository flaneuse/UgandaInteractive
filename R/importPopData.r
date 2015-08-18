library(shiny)


# colors
colorM = '#7A92E2'
colorF = '#E37686'

# function to import population pyramid projections.

allPopData <- read.csv("~/Documents/USAID/Uganda Interactive Report/data/pop_pyramids/allPopData.csv")

setwd("~/GitHub/UgandaInteractive")

allPopData$Age.Cohort = factor(allPopData$Age.Cohort,
                               c(' 0- 4', ' 5- 9',    ' 10- 14',  ' 15- 19',  ' 20- 24',  ' 25- 29',  ' 30- 34',  ' 35- 39',
                              ' 40- 44',  ' 45- 49',  ' 50- 54',  ' 55- 59',  ' 60- 64',  ' 65- 69',  ' 70- 74',  ' 75- 79',
                                 ' 80- 84',  ' 85- 89',  ' 90- 94',  ' 95- 99', '100+' ))


years = unique(allPopData$year)

i = 1

popData = allPopData %>% 
  filter(year == years[i])


ggplot(popData, aes(x = `Age.Cohort`)) +
  geom_bar(aes(y = Male), stat = 'identity', fill = colorM) +
  geom_bar(aes(y = -1*Female), stat = 'identity', fill = colorF) +
  theme_classicLH() +
  facet_wrap(~type) +
  coord_flip()