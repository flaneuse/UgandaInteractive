shinyUI(fluidPage(
  
  # Application title
  titlePanel("Uganda population explorer"),
  
  # Sidebar with a slider input for the number of bins

    
    # Show a plot of the generated distribution
    mainPanel(
      plotOutput("popDistribStacked"), 
      sliderInput("yearSlider",
                  "year:",
                  min = 2010,
                  max = 2040,
                  value = 2010,
                  sep = "",
                  step = 5,
                  animate = TRUE),
      plotOutput("popDistrib")
    )
  )
)