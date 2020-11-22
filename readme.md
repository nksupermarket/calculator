# Calculator

See the project live: https://lookingcoolonavespa.github.io/calculator/

A calculator app made using:

- html
- css
- vanilla javascript

# Notes

I wanted this project to function as close to a real calculator as possible, which introduced some issues. There were a lot of extra conditionals I had to put it to make it work, and I can't even lie, my code suffered for it.

Refactoring took some work because I had some trouble understanding what I was trying to do. Introducting what I call "vehicle variables" (basically variables with boolean values that tell me where I'm at so I can go where I need to go) helped clean things up a lot.

Next time I've gotta do a better job of planning things out because "just try to make it work" code really made my head hurt trying to debug this thing. At the very least, devtools and I have created a much stronger relationship, and I'm thankful for this.

I'm pretty happy with how things turned out. The only thing I'd like to fix is you're not able to select any values in the notepad. Reason for this is because of the way I styled it. I didn't even realise this was going to be issue until I finished. Oh well. Not going to mess with it now. Just too much work and not enough of a payoff. Next time I'm going to use css grid to position everything.

## Things I learned

- local variables are not overwritten when the function is called. Instead, a new set of local variables are created. For example, in the notepad section where your evaluations are outputted, it can output multiple lines simultaneously, and yet the same variables are used to store the number, operator, and answer.

- if you have a div on top of another div, you won't be able to interact with the bottom div even if there is nothing obscuring it. This can be solved with the css styling pointer-events: none placed on the top div.

- js is really bad with decimals, I couldn't figure out a way to deal with it
