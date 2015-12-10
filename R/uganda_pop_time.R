# Script to import and visualize Uganda population data. ------------------
# Laura Hughes, lhughes@usaid.gov, November 2015


library(tidyr)
library(dplyr)
library(ggplot2)
library(readr)

# Import data- UN recorded and from projections. --------------------------
# Data source: http://esa.un.org/unpd/wpp/
# Cut out only Uganda data; includes both sexes.  
# Population estimates are for the medium, high, and low estimates.
# Note: population is given in thousands.

un = read_csv("~/Documents/USAID/Uganda Interactive Report/data/UN_population_pred.csv", col_names = FALSE, col_types = list(col_number(), col_number(), col_number(),col_number()))
colnames(un) = c('year', 'medium', 'high', 'low')

# population @ 1950
initPop = un$medium[1] / 1000

# Convert population to millions.
un = un %>%
  group_by(year) %>% 
  mutate_each(funs(millions  = . / 1000)) %>% 
  mutate(pct = medium / initPop)


ggplot(un, aes(x = year, y = medium)) +
  geom_vline(xintercept = 1974, colour = 'dodgerblue', size = 0.2) +
  geom_vline(xintercept = 1996, colour = 'dodgerblue', size = 0.2) +
  geom_vline(xintercept = 2017, colour = 'dodgerblue', size = 0.2) +
  geom_vline(xintercept = 2041, colour = 'dodgerblue', size = 0.2) +
  geom_vline(xintercept = 2079, colour = 'dodgerblue', size = 0.2) +
  geom_line(size = 2)
# devtools::install_github("hrbrmstr/waffle", ref="cran")
library('waffle')
library('extrafont')

waffle(un$medium[1], colors = 'dodgerblue', rows = 10, size = 4) + coord_flip()
font_import()