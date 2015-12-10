uganda_births_text <- read.table("~/Downloads/PopTables/uganda_births_text.txt", quote="\"", comment.char="", skip = 6)
View(uganda_births_text)


uganda_pop <- read.table("~/Downloads/PopTables/uganda_pop_text.txt", quote="\"", comment.char="", skip = 6)
View(uganda_births_text)


births = uganda_births_text %>% 

  mutate(rows = row.names(uganda_births_text)) %>% 
gather(cols, births, -rows) %>% 
  mutate(births = ifelse(births == -9999, 0, births), 
         ratio  = births / upg)

ggplot(births %>% slice(1000:1100), aes(x = rows, y = cols, fill = births)) +
  geom_tile()