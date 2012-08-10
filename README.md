bookit.js
=========

## Description

book.js will turn this:

    <div id="target_div">
        <div data-title="Section 1">
            Page 1
        </div>
      <div>
            Page 2
        </div>
    	<div>
            Page 3
        </div>
        <div data-title="Section 2">
            Page 4
        </div>
        <div>
            Page 5
        </div>
    </div>
    
into this:

![Screenshot](https://raw.github.com/InfoTech/bookit.js/master/example.png)

## Installation

Include bookit.js and bookit.css on your page, along with jQuery.

## Usage

    $(document).ready(function() {
      $("#target_div").bookit();
    });

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
