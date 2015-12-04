library(haven)
library(dplyr)
library(tidyr)
library(scales)
library(ggvis)
library(ggplot2)

d = read_dta('~/Documents/USAID/UgandaFinalData/RigaPanel_201504_all.dta')

d = d %>% 
  mutate(under15_cat = cut(under15, breaks = c(-1, 0, 1, 2, 3, 4, 20)))


d  %>% group_by(under15) %>% summarise(mean(goodcope, na.rm=T), n())


# What's worse as you have more kids? (just looking at trends, not ctrlling for things)
# good coping
d  %>% group_by(under15_cat) %>% summarise(mean(goodcope, na.rm=T), n())
ggplot(d, aes(x = under15_cat, y = goodcope)) + 
  stat_summary(fun.y = mean, geom = 'point', size = 4) +
  coord_cartesian(ylim = c(0, 0.5)) +
  scale_y_continuous(labels = percent)

# hazard shock
d  %>% group_by(under15_cat) %>% summarise(mean(hazardShk, na.rm=T), n())

# not really health shk.
ggplot(d, aes(x = under15_cat, y = healthShk)) + 
  stat_summary(fun.y = mean, geom = 'point', size = 4) +
  coord_cartesian(ylim = c(0, 0.25)) +
  scale_y_continuous(labels = percent)

# but hhsize matters.
ggplot(d, aes(x = hhsize, y = healthShk)) + 
  stat_summary(fun.y = mean, geom = 'point', size = 4) +
  coord_cartesian(ylim = c(0, 0.25)) +
  scale_y_continuous(labels = percent)

# stunting
d  %>% group_by(under15_cat) %>% summarise(mean(hazardShk, na.rm=T), n())

# assets: interesting: higher.
d  %>% group_by(under15_cat) %>% summarise(mean(wealthindex_rur, na.rm=T), n())

# consumption: less $$
d  %>% group_by(under15_cat) %>% summarise(mean(pcexpend2011, na.rm=T), n())

# food insecurity: lacked food.
d  %>% group_by(under15_cat) %>% summarise(mean(foodLack, na.rm=T), n())

# interesting: better diets
d  %>% group_by(under15_cat) %>% summarise(mean(dietDiv, na.rm=T), n())
d  %>% group_by(under15_cat) %>% summarise(mean(FCS, na.rm=T), n())

# income diversification: not large difference.
d  %>% group_by(under15_cat) %>% summarise(mean(divhh, na.rm=T), n())
