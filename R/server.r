library(shiny)
library(dplyr)
library(ggplot2)
library(grid)


# colors
colorM = '#7A92E2'
colorMdk = '#033468'
colorF = '#E37686'
colorFdk = '#650E29'

# function to import population pyramid projections.

allPopData <- read.csv("~/Documents/USAID/Uganda Interactive Report/data/pop_pyramids/allPopData.csv")

allPopData = allPopData %>% 
  mutate(type = ifelse(type == 'base',
                       'no intervention',
                       '25% fertility reduction'))


allPopData$Age.Cohort = factor(allPopData$Age.Cohort,
                               c(' 0- 4', ' 5- 9',    ' 10- 14',  ' 15- 19',  ' 20- 24',  ' 25- 29',  ' 30- 34',  ' 35- 39',
                                 ' 40- 44',  ' 45- 49',  ' 50- 54',  ' 55- 59',  ' 60- 64',  ' 65- 69',  ' 70- 74',  ' 75- 79',
                                 ' 80- 84',  ' 85- 89',  ' 90- 94',  ' 95- 99', '100+' ))


years = unique(allPopData$year)



theme_classicLH<- function() {
  theme(title = element_text(size = 22, face = 'bold', vjust = -3, 
                             color = 'grey', hjust = 0.98),
        axis.line = element_line(color = 'grey', size = 0.7),
        axis.line.y = element_blank(),
        axis.ticks.x = element_line(color = 'black', size = 1),
        axis.text.x = element_text(size = 16, color = 'black'),
        axis.title.x = element_text(size = 22, color = 'black',
                                    vjust = 0.5, hjust = 0.5),
        axis.ticks.y = element_line(color = 'black', size = 1),
        axis.text.y = element_text(size = 16, color = 'black'),
        legend.position="none",
        axis.title.y = element_blank(),
        panel.margin = unit(2, "lines"),
        strip.text = element_text(size = 16),
        strip.background = element_blank(),
        panel.background = element_blank(),
        panel.grid.minor.x = element_blank(),
        panel.grid.major.x = element_blank(),
        panel.grid.minor.y = element_blank(),
        panel.grid.major.y = element_blank())
}



# server ------------------------------------------------------------------


server <- function(input, output) {
  
  output$popDistribStacked = renderPlot({
    
    popData = allPopData %>% 
      filter(year == input$yearSlider)
    
    
    ggplot(popData, aes(x = `Age.Cohort`)) +
      geom_bar(aes(y = Male), stat = 'identity', 
               position = 'identity', alpha = 0.6, 
               fill = colorM) +

      # scale_fill_manual(values = c('no intervention' = 'black', 
      # '25% fertility reduction' = '#7A92E2')) +
      geom_bar(aes(y = -1*Female), stat = 'identity', 
               position = 'identity', alpha = 0.6, 
               fill = colorF) +
 
      geom_hline(xInt = 0, size = 2, colour = 'white') +
      
      theme_classicLH() +
      coord_flip(ylim = c(-6,6)) +
      ylab('population (in millions)') +
      ggtitle(input$yearSlider)
  })
  
  output$popDistrib = renderPlot({
    
#     popData = allPopData %>% 
#       filter(year == input$yearSlider)
#     
#     
#     ggplot(popData, aes(x = `Age.Cohort`, fill = type)) +
#       geom_bar(aes(y = Male), stat = 'identity', 
#                fill = colorM) +
#       geom_bar(aes(y = -1*Female), stat = 'identity', 
#                fill = colorF) +
#       theme_classicLH() +
#       facet_wrap(~type) +      
#       coord_flip(ylim = c(-6,6))
  })
}






# different colors --------------------------------------------------------
# 
# baseData = allPopData %>% 
#   filter(year == input$yearSlider,
#          type == 'no intervention')
# 
# redData = allPopData %>% 
#   filter(year == input$yearSlider,
#          type == '25% fertility reduction')
# 
# 
# ggplot(baseData, aes(x = `Age.Cohort`)) +
#   geom_bar(aes(y = Male), stat = 'identity', 
#            position = 'identity', alpha = 0.4, 
#            fill = colorMdk) +
#   
#   geom_bar(aes(x = `Age.Cohort`, y = Male), data = redData,
#            stat = 'identity', 
#            alpha = 1, 
#            fill = colorM) +
#   
#   geom_bar(aes(y = -1*Female), stat = 'identity', 
#            alpha = 0.4, 
#            fill = colorFdk) +
#   
#   geom_bar(aes(x = `Age.Cohort`, y = -1*Female), data = redData,
#            stat = 'identity', 
#            alpha = 1, 
#            fill = colorF) +
#   
#   geom_hline(xInt = 0, size = 2, colour = 'white') +
#   
#   theme_classicLH() +
#   coord_flip(ylim = c(-6,6)) +
#   ylab('population (in millions)') +
#   ggtitle(input$yearSlider)

