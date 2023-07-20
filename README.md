# debug-grid

A javascript tool for adding & removing a grid overlay to help while working on layouts.

## Installation

Include the `debug-grid.js` file in your project. It will automatically initialise when loaded.
Also include & compile the `debug-grid.less` styles, in which you can adjust the layout to suit your project.

## Configuration

To configure the grid settings for your site, open the `debug-grid.less` file and edit the variables at the top of the file. By default the maximum columns output are 24, but if you need more than this you can adjust the `cols` variable in the `debug-grid.js` file. Otherwise you just use the `@_grid-columns` values in the LESS file to determine how many are shown at desktop size.

## Testing it locally

This project comes with a simple webpack setup so you can test out the grid locally. To run, open a terminal for the project and type:

```
nvm use
pnpm i
pnpm start
```

You can then browse to the test page at `localhost:9000` and use the toggle commands below to test the grid.

## Toggling the grid

Once loaded in your website you can use the following key combo to show the grid overlay:

`Control + Option + /`

The grid can be hidden again by using the same key combo.

## Using a querystring parameter

If you want to continue showing the overlay between refreshes without having to use the key commands again, you can add a querystring parameter to your site URL:

`?columns` will show the columns

If you are chaining querystring values and need to supply a value for the parameter, you can enter anything you like — the value is ignored (e.g. `&columns=yes&othervalue=X`)

## Additional styles

Any additional styles you require can be added into the `debug-grid.less` file. By default there is a 'small' mediaquery breakpoint used, under which point half of the columns are hidden. You may want to remove this, or adjust to suit your project settings.