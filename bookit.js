(function( $ ) {
  $.fn.bookit = function() {
  
  	var pages = this.children(":not(.common)");
		var current_page = pages.first();
		pages.hide();
		current_page.show();
		
		var transitioning = false;
  	
  	var buttonCheck = function(){
			if(current_page[0] == pages.first()[0]){
				$("#prevpagebtn").attr('disabled', 'disabled');
				$("#prevpagebtn").addClass('disabled');
			}else{
				$("#prevpagebtn").removeAttr('disabled');
				$("#prevpagebtn").removeClass('disabled');
			}

			if(current_page[0] == pages.last()[0]){
				$("#nextpagebtn").attr('disabled', 'disabled');
				$("#nextpagebtn").addClass('disabled');
			}else{
				$("#nextpagebtn").removeAttr('disabled');
				$("#nextpagebtn").removeClass('disabled');
			} 
		}
		
		var pageCheck = function() {
			index = pages.index(current_page);
			page_dd.find(":selected").removeAttr('selected');
			page_dd.find(':nth-child(' + (index + 1) + ')').attr('selected', 'selected');
		}
		
		var sectionCheck = function() {
			page_index = pages.index(current_page);
			section_dd.find(":selected").removeAttr('selected');
			section_dd.children().each(function(index) {
				if ($(this).val() == page_index) {
					$(this).attr('selected', 'selected');
					return false;
				}
				else if ($(this).val() > page_index) {
					$(this).prev().attr('selected', 'selected');
					return false;
				}
			});
		}
  
  	var nextButton = function(){
			$(".success").fadeOut();
			if (transitioning == false){
			  transitioning = true;
		    current_page.fadeOut(function(){
		    	current_page = current_page.next();
		      current_page.fadeIn(function(){
		        buttonCheck();
		        pageCheck();
		        sectionCheck()
		        transitioning = false;
		      });
		    });
		  }
		}
		
		var prevButton = function(){
		  if (transitioning == false){
		    transitioning = true;
		    current_page.fadeOut(function(){
		    	current_page = current_page.prev();
		      current_page.fadeIn(function(){
		        buttonCheck();
		        pageCheck();
		        sectionCheck();
		        transitioning = false;
		      });
		    });
		  }
		}
  
  	var next_button = $("<a id=\"nextpagebtn\" class=\"right\" href=\"#\">Next</a>");
  	var prev_button = $("<a id=\"prevpagebtn\" class=\"right\" href=\"#\">Previous</a>");
  	var page_flow = $("<div id=\"pageflow\"></div>");
  	var controls = $("<div id=\"paginatorControls\"></div>");
  	var clear = $("<div class=\"clear\"></div>");
  	var section_dd = $("<select id=\"section_select\" class=\"left\"></select>");
  	var page_dd = $("<select id=\"page_select\" class=\"right\"></select>");
  	var page_dd_count = $("<span id=\"pageCount\" class=\"right\"> of " + pages.size() + "</span>");  	
  	
  	pages.each(function(index) {
  		if ($(this).attr("data-title") != null)
	  		section_dd.append("<option value=\"" + index + "\">" + $(this).attr("data-title") + "</option>");

			page_dd.append("<option value=\"" + index + "\">" + (index + 1) + "</option>");
		});
		
		if(section_dd.children().size() > 0)
			page_flow.append(section_dd);
			
		page_flow.append(next_button).append(prev_button).append(page_dd_count).append(page_dd);
		controls.append(page_flow).append(clear);
		controls.insertBefore(this);
		this.addClass("pageViewer");
		this.append(clear.clone());
		
		next_button.click(function(){ nextButton() });
		prev_button.click(function(){ prevButton() });
		page_dd.change(function() {
			if (transitioning == false){
		    transitioning = true;
				var page_index = parseInt(page_dd.find(":selected").val());
				current_page.fadeOut(function(){
			  	current_page = $(pages[page_index]);
			    current_page.fadeIn(function(){
			      buttonCheck();
			      pageCheck();
			      sectionCheck();
			      transitioning = false;
			    });
			  });
		  }
		});
		section_dd.change(function() {
			if (transitioning == false){
		    transitioning = true;
				var page_index = parseInt(section_dd.find(":selected").val());
				current_page.fadeOut(function(){
			  	current_page = $(pages[page_index]);
			    current_page.fadeIn(function(){
			      buttonCheck();
			      pageCheck();
			      transitioning = false;
			    });
			  });
		  }
		});

		buttonCheck();
  };
})( jQuery );
