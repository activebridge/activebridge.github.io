---
author: Alex Ovcharov
author-position:
background: ruby-code-stylometry-back
category: engineering
date: "2017-03-15"
layout: post
post-id: ruby-code-stylometry
post-title: "How to Provide Developer Code Writing De-anonymization"
time-to-read: 2 min
scripts: [post]

author-url: ""
article-body: ""
date-modified: "2020-02-25"
description: "A lot of customers complain that outstaffing agencies frequently replace the interviewed developer to another
              one"
title: "Reasons why the one could resort to code stylometry"
---

A little while ago we’ve discussed topical issues in our agency meeting. The agenda was about the setup of developers. A lot of customers complain that outstaffing agencies frequently replace the interviewed developer to another one. 

To solve this issue and clear up confusion we’ve implemented different tracking systems and face-to-face developers’ and customers’ discussions. But actually, it doesn’t solve the problem. How to prove you write your own script, that it’s your masterpiece, not your colleague. So we’ve come to the conclusion, that Rubocop gem  is a sticking point.
Perhaps, the decision is Ruby code stylometry.

The way programmers think and write their code can help to determine the person who wrote the given piece of code.  There are various reasons why the one could resort to code stylometry.  **Programmer De-anonymization**, **Ghostwriting Detection**, **Software forensics**, **Copyright Investigation**, **Authorship verification**. While some of them could be not entirely related to ruby stylometry but to code stylometry in general, it is still could be useful to determine the author just by source code.

The obvious solution is to use neural networks because the writing style can vary from programmer to programmer. What data should be based on determining the author? The code itself could be divided into a couple of different features:  
* **Lexical and Layout** features which are simple preferences for certain keywords, or writing style. For example, we can measure the number of functions per source line to determine the likelihood of using longer functions over shorter by programmer or vice versa. 
* **Syntactic Features** deeply relies on the syntactic use of the language by a programmer. Frequency and types of AST (Abstract Syntax Tree) nodes used, maximum depth of these nodes, etc.

```ruby
      def function_count
        parsed_data.ast&.each_node(:def, :defs).count.to_f / all_lines_size
      end
```

```ruby
      def size_of_all_keywords
        raw_code.scan(/\b#{KEYWORDS_LIST.join('\b|\b')}\b/).size.to_f / all_lines_size
      end
```


That itself can provide the powerful tool for de-anonymizing programmers. The second step is representing this data in a shape of the vector or simply normalize parsed data. The first problem that comes to mind is scaling. If we, let's say, measuring the number of functions of tenary operation, the bigger the file is the bigger number we get. That one can be overcomed just by dividing received data by the other scaling value. A number of character or lines per file that is. I prefer to use the number of line because the end result easier to read.

The second problem lies in the Ruby community. There are certain rules while writing code in Ruby. which is Ruby Style Guide or gems like Rubocop. It is great that community comes with such direct style guide for programmers, but it can prove the difficulty of determining ruby code author. For example, preference of single quotes over double quotes, kind of generalizing code, greatly decreasing success rate of neural network classifications. Unfortunately, there is no strict solution to this but relying on other tools.

![](https://i.imgur.com/F4aQAJn.png)


In the end, the closest success rate of de-anonymizing I could get is seventy-two percent. Which is not that bad implying that all the programmers used Rubocop gem and adhered to Ruby Style Guide.
