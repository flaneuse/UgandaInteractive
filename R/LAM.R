library(haven)
library(dplyr)
library(tidyr)
library(scales)
library(ggvis)
library(ggplot2)
library(broom)

d = read_dta('~/Documents/USAID/UgandaFinalData/RigaPanel_201504_all.dta')
d = d %>% 
  mutate(under15_cat = cut(under15, breaks = c(-1, 0, 1, 2, 3, 4, 20)),
         stuntedPct = stuntedCount / under5,
         educHoh_cat = ifelse(educHoh == 0, 'none',
                              ifelse(educHoh %in% 1:3, 'primary',
                                     ifelse(educHoh %in% c(4:6), 'secondary',
                                            ifelse(educHoh %in% c(7,8), 'tertiary', NA)))),
         educAdult_cat = ifelse(educAdult == 0, 'none',
                              ifelse(educAdult %in% 1:3, 'primary',
                                     ifelse(educAdult %in% c(4:6), 'secondary',
                                            ifelse(educAdult %in% c(7,8), 'tertiary', NA)))),
         rural = ifelse(stratumP >= 3, TRUE, FALSE)) %>% 
  filter(rural == TRUE)


d  %>% group_by(under15) %>% summarise(mean(goodcope, na.rm=T), n())

d = removeAttributes(d)



# children. ---------------------------------------------------------------
c = read_dta('~/Documents/USAID/UgandaFinalData/childHealth_I_all.dta')

monInt = d %>% select(HHID, monthInt, year)

c = left_join(c, monInt)

# Are the children consistent ages?
c09_10 = c %>% 
  filter(year %in% c(2009, 2010)) %>% 
  select(PID, year, ageMonths, monthInt, gender) %>%
  group_by(PID) %>% 
  mutate(lagAge = lag(ageMonths), 
         lagInt = lag(monthInt),
         lagSex = lag(gender)) %>% 
  filter(!is.na(lagAge)) %>% 
  mutate(diffAge = -lagAge + ageMonths,
         diffInt = monthInt - lagInt,
         reasonable = diffAge <= 15 & diffAge >= 9,
         sexAgree = gender == lagSex)

ggplot(c09_10, aes(x = diffAge, fill = reasonable)) + 
  geom_histogram(binwidth = 1, position = 'stack') + 
  theme_bw() +
  xlab('difference in age (2010 - 2009)') +
  ggtitle('Children in Uganda LSMS panel')

c09_10  %>% group_by(diffAge < 14 & diffAge > 10) %>% summarise(n())
c09_10  %>% group_by(diffAge < 15 & diffAge > 9) %>% summarise(n())
c09_10  %>% group_by(diffAge < 16 & diffAge > 8) %>% summarise(n())
c09_10  %>% group_by(diffAge < 17 & diffAge > 7) %>% summarise(n())

c09_10  %>% group_by(diffInt) %>% summarise(n())

c09_11 = c %>% 
  filter(year %in% c(2009, 2011)) %>% 
  select(PID, year, ageMonths, monthInt, gender) %>%
  group_by(PID) %>% 
  mutate(lagAge = lag(ageMonths), 
         lagInt = lag(monthInt),
         lagSex = lag(gender)) %>% 
  filter(!is.na(lagAge)) %>% 
  mutate(diffAge = -lagAge + ageMonths,
         diffInt = monthInt - lagInt,
         reasonable = diffAge <= 27 & diffAge >= 21, 
         sexAgree = gender == lagSex)

ggplot(c09_11, aes(x = diffAge, fill = reasonable)) + 
  geom_histogram(binwidth = 1, position = 'stack') + 
  theme_bw() +
  xlab('difference in age (2011 - 2009)') +
  ggtitle('Children in Uganda LSMS panel')


c10_11 = c %>% 
  filter(year %in% c(2010, 2011)) %>% 
  select(PID, year, ageMonths, monthInt, gender) %>%
  group_by(PID) %>% 
  mutate(lagAge = lag(ageMonths), 
         lagInt = lag(monthInt),
         lagSex = lag(gender)) %>% 
  filter(!is.na(lagAge)) %>% 
  mutate(diffAge = -lagAge + ageMonths,
         diffInt = monthInt - lagInt,
         reasonable = diffAge <= 15 & diffAge >= 9,
         sexAgree = gender == lagSex)

ggplot(c10_11, aes(x = diffAge, fill = reasonable)) + 
  geom_histogram(binwidth = 1, position = 'stack') + 
  theme_bw() +
  xlab('difference in age (2011 - 2010)') +
  ggtitle('Children in Uganda LSMS panel')


ggplot(c09_10, aes(x = `2009`, y = `2010`)) +
  geom_point(size = 3, alpha = 0.2) + ggtitle("children's age in Uganda LSMS data")

ggplot(c10_11, aes(x = `2010`, y = `2011`)) +
  geom_point(size = 3, alpha = 0.2) + ggtitle("children's age in Uganda LSMS data")

ggplot(c09_11, aes(x = `2009`, y = `2011`)) +
  geom_point(size = 3, alpha = 0.2) + ggtitle("children's age in Uganda LSMS data")


# Trends: what’s associated with more kids? -------------------------------

# What's worse as you have more kids? (just looking at trends, not ctrlling for things)
# bad coping (but good coping better)
d  %>% group_by(under15_cat) %>% summarise(mean(goodcope, na.rm=T), n())
ggplot(d %>% filter(year == 2011), aes(x = under15_cat, y = goodcope)) + 
  stat_summary(fun.y = mean, geom = 'point', size = 4) +
  coord_cartesian(ylim = c(0, 0.5)) +
  scale_y_continuous(labels = percent)

# hazard shock
d  %>% group_by(under15_cat, year) %>% summarise(mean(hazardShk, na.rm=T), n())

ggplot(d , aes(x = under15_cat, y = hazardShk)) + 
  stat_summary(fun.y = mean, geom = 'point', size = 4) +
  coord_cartesian(ylim = c(0, 0.6)) +
  scale_y_continuous(labels = percent) +
  facet_wrap(~year) +
  theme_bw()


# not really health shk.
ggplot(d, aes(x = under15_cat, y = healthShk)) + 
  stat_summary(fun.y = mean, geom = 'point', size = 4) +
  coord_cartesian(ylim = c(0, 0.25)) +
  scale_y_continuous(labels = percent)

# but hhsize matters. (probabilistic effect?)
ggplot(d, aes(x = hhsize, y = healthShk)) + 
  stat_summary(fun.y = mean, geom = 'point', size = 4) +
  coord_cartesian(ylim = c(0, 0.25)) +
  scale_y_continuous(labels = percent)

# stunting
d  %>% group_by(under15_cat) %>% summarise(mean(stuntedCount, na.rm=T), n())

# Okay, yeah, obviously.  More kids --> more likelihood that one of them is stunted.
# What about percent?
d  %>% filter(!is.infinite(stuntedPct)) %>% 
  group_by(under15_cat) %>% summarise(mean(stuntedPct, na.rm=T), n())
# Okay.  stunting seems to be better.

# assets: interesting: higher.
d  %>% group_by(under15_cat) %>% summarise(mean(wealthindex_rur, na.rm=T), n())

d  %>% group_by(under15_cat) %>% summarise(mean(p_ag, na.rm=T), n())
d  %>% group_by(under15_cat) %>% summarise(mean(p_nonag, na.rm=T), n())


# education (HoH)
# No education                  Pre-primary                      Primary                 Post-Primary Junior Techincal/Vocational               Lower Secondary              Upper Secondary 
# 0                            1                            2                            3                            4                            5                            6 
# Post-Secondary Specialized                     Tertiary 
# 7                            8 

x = d  %>% group_by(under15_cat, educAdult_cat) %>% 
  filter(!is.na(educAdult)) %>% 
  summarise(num = n()) %>%
  mutate(pct = num/sum(num))


ggplot(x, aes(x =  educAdult_cat, y = pct)) +
  facet_wrap(~ under15_cat) +
  geom_hline(yintercept = 0.239, colour = 'red') +
  geom_hline(yintercept = 0.546, colour = 'orange') +
  geom_hline(yintercept = 0.153, colour = 'green') +
  geom_hline(yintercept = 0.062, colour = 'blue') +
  geom_bar(stat = 'identity') +
  theme_jointplot()

z = d  %>% group_by(under15_cat, educHoh_cat) %>% 
  filter(!is.na(educHoh)) %>% 
  summarise(num = n()) %>%
  mutate(pct = num/sum(num))


ggplot(z, aes(x =  educHoh_cat, y = pct)) +
  facet_wrap(~ under15_cat) +
  geom_hline(yintercept = 0.267, colour = 'red') +
  geom_hline(yintercept = 0.560, colour = 'orange') +
  geom_hline(yintercept = 0.125, colour = 'green') +
  geom_hline(yintercept = 0.048, colour = 'blue') +
  geom_bar(stat = 'identity') +
  theme_jointplot()

d  %>% group_by(under15_cat) %>% summarise(mean(literateHoh, na.rm=T), n())
d  %>% group_by(under15_cat) %>% summarise(mean(literateSpouse, na.rm=T), n())

d  %>% group_by(under15_cat) %>% summarise(mean(educAdult, na.rm=T), n())

ggplot(d %>% filter(!is.na(educAdult_cat)), aes(x =  educAdult_cat)) +
  geom_bar(aes(y = (..count..)/sum(..count..))) + 
  scale_y_continuous(labels=percent) + 
  facet_wrap(~ under15_cat)
  

# Female headed: decr. more children (makes sense)
d  %>% group_by(under15_cat) %>% summarise(mean(femhead, na.rm=T), n())


# consumption: less $$
d  %>% group_by(under15_cat) %>% summarise(mean(pcexpend2011, na.rm=T), n())


ggplot(d, aes(x = under15_cat, y = pcexpend2011)) +
  stat_summary(fun.y = mean, geom = 'point', size = 4) +
  facet_wrap(~year) +
  theme_jointplot()

# food insecurity: lacked food.
z =d  %>% group_by(under15_cat) %>% summarise(avg = mean(foodLack, na.rm=T), n())

ggplot(z, aes(x = under15_cat, y = avg)) +
geom_bar(stat = 'identity')

# interesting: better diets
d  %>% group_by(under15_cat) %>% summarise(mean(dietDiv, na.rm=T), n())
d  %>% group_by(under15_cat) %>% summarise(mean(FCS, na.rm=T), n())

ggplot(d, aes(x = under15_cat, y = FCS)) +
  stat_summary(fun.y = mean, geom = 'point', size = 4) +
  facet_wrap(~monthInt) +
  theme_jointplot() 

# income diversification: not large difference.
d  %>% group_by(under15_cat) %>% summarise(mean(divhh, na.rm=T), n())

ggplot(d, aes(x = under15_cat, y = literateHoh)) +
stat_summary(fun.y = mean, geom = 'point', size = 4) +
  facet_wrap(~year) +
  theme_jointplot()

ggplot(d, aes(x = under15_cat, y = literateSpouse)) +
  stat_summary(fun.y = mean, geom = 'point', size = 4) +
  facet_wrap(~year) +
  theme_jointplot()


# ANOVAs -----------------------------------------------------------------
summary(aov(badcope ~ under15 + year, data = d))
summary(aov(goodcope ~ under15 + year, data = d))

summary(aov(hazardShk ~ under15 + year, data = d))
summary(aov(healthShk ~ under15 + year, data = d))
summary(aov(pcexpend2011 ~ under15 + year, data = d))
summary(aov(dietDiv ~ under15 + year, data = d))
summary(aov(FCS  ~ under15 + year, data = d))

summary(aov(divhh ~ under15 + year, data = d))
summary(aov(foodLack ~ under15 + monthInt, data = d))

d_under5 = d %>% filter(under5 > 0)
summary(aov(stuntedPct ~ under15 + year, data = d_under5))

summary(aov(educHoh ~ under15 + agehead, data = d))

summary(aov(literateHoh ~ under15 + agehead, data = d))

# random plot: scrabble.  -------------------------------------------------------------
probability = 0.2592946

df = data.frame(col = sample(c(0,1), 100, replace = TRUE, prob = c(1- probability, probability)),
                x = rep(1:10, 10), y = c(rep(1,10), rep(2,10), rep(3, 10), rep(4,10), rep(5,10),
                                         rep(6,10), rep(7,10), rep(8,10), rep(9,10), rep(10,10)))



ggplot(df, aes(x = x, y = y,
               fill = factor(col))) + 
  geom_tile(colour = 'white', size = 0.5) + 
  scale_fill_manual(values = c("0" = grey15K, "1" = grey30K)) +
  theme_blankLH()

probability = 0.3362754

df = data.frame(col = sample(c(0,1), 100, replace = TRUE, prob = c(1- probability, probability)),
                x = rep(1:10, 10), y = c(rep(1,10), rep(2,10), rep(3, 10), rep(4,10), rep(5,10),
                                         rep(6,10), rep(7,10), rep(8,10), rep(9,10), rep(10,10)))


ggplot(df, aes(x = x, y = y,
               fill = factor(col))) + 
  geom_tile(colour = 'white', size = 0.5) + 
  scale_fill_manual(values = c("0" = grey15K, "1" = grey30K)) +
theme_blankLH()


probability = 0.3627153

df = data.frame(col = sample(c(0,1), 100, replace = TRUE, prob = c(1- probability, probability)),
                x = rep(1:10, 10), y = c(rep(1,10), rep(2,10), rep(3, 10), rep(4,10), rep(5,10),
                                         rep(6,10), rep(7,10), rep(8,10), rep(9,10), rep(10,10)))


ggplot(df, aes(x = x, y = y,
               fill = factor(col))) + 
  geom_tile() + 
  scale_fill_manual(values = c("0" = grey15K, "1" = grey30K)) +
  theme_blankLH()
