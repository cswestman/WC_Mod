$(document).ready(function(){
  
  /*
    This script is for dynamically adjusting DOM elements on a particular website.
    The main site is built using an older version of the Kentico CMS system, therefor, a 
    lot of bugs have kept the implimentation of resonsive design from working correctly.
    This script simply modifies DOM elements in a way that, when adding or taking away 
    things in the CMS, everything will work without the CMS user having tany programming experience.
  */  


  //grab viewport width for use in multiple methods throughout script
  var vpWidth = $(window).width();
  //add class to top level nav 'ul' and store in var
  $("#topNav1>ul").addClass("topUl");  

  //function for adjusting the padding on the navigation
  var fixNavCenter = function(){
    //create array to store all width values of all 'ul' children
    var totalNavWidth = 0;
    //find position of first and last 'ul' child elements
    $(".topUl>li").each(function(){
      //$(this).addClass("childOfUl");
      var childWidth = $(this).width();
      //console.log(childWidth);
      totalNavWidth += childWidth;
      //console.log((vpWidth - totalNavWidth) / 2);
    });
    //grab vp width and main content width
    var newVpWidth = $(window).width(); 
    var contentWidth = $("#main_content").width();
    //calcualte new padding-left for avg screen sizes for nav 'ul' in order to center it
    var newNavPadding = (Math.ceil(newVpWidth) - Math.ceil(totalNavWidth)) / 2;
    //calcualte new padding-left for xl screen sizes
    var navPadXLVP = (Math.ceil(contentWidth) - Math.ceil(totalNavWidth)) / 2;
    console.log("New padding avg will be " + newNavPadding);
    console.log("New padding large will be " + navPadXLVP);
    //run through conditions and set new padding 
    if(newVpWidth > 1199) {
      $(".topUl").attr("style", "padding-left:" + navPadXLVP + "px !important");
    }
    else if(newVpWidth > 767 && newVpWidth <= 1199) {
      $(".topUl").attr("style", "padding-left:" + newNavPadding + "px !important");
    }
    else if (newVpWidth <= 767){
      //for mobile 
      $(".topUl").removeAttr("style");
    } 
  }; 
  //initial function call for first page load
  fixNavCenter();
  
  //initial img size rendering on load
  //iterate over each img, compare it to vpWidth, then set new attribute if larger than vpWidth
  var resizeImg = function(){
    $( "img" ).each(function() {
      if($(this).width() > vpWidth){
        $(this).removeAttr("style").attr("width", "100%").attr("height", "auto");
      }
    })
  };
  resizeImg();

  var adjustFootWidth = function(){
    //updating footer width when browser width is manually changed
    var newWidth = $('#main_content').width();
    var elNew = $('#vi-main-foot');
    elNew.attr("style", "width:" + newWidth + "px");
  };
  //call funtion for initial page load
  adjustFootWidth();
  
  /* These next few blocks of code are to fix 
     the nav ul rendering on iphones. For some reason, 
     the top position of elements are calculated differently on iOS.
     There's still some slight issues with how it renders on other devices,
     but this at least gets the full nav to show on iphone.
  */
  var adjustNavH = function(){
    //grab position of navbar and grab child 'ul'
    var navPos = $(".navbar").position();
    var navUl = $("#topNav1>ul");
    //store top position
    var navTopHeight = navPos.top;
    //compare top position height and make height adjustments
    if(navTopHeight < 157){
      navUl.addClass("vi-adjustHeight");
    }
    else{
      navUl.removeClass("vi-adjustHeight");
    }

  };
  adjustNavH();

  /*This function does a few different tasks upon changing the view port size.
    It will call mutiple functions as the page is mannually resized.
    It will adjust the navigation so that it is centered at the top, regardless of how many 
    navigation options there are.
    It will adjust the the footer width to fit the main content width.
    It will also adjust all images if the normal width is outside of the viewport width; the 
    reason for this is that older Kentico CMS does not allow the entry of img sizes of value 100% and/or auto.
  */  
  $( window ).resize(function() {
    //call methods as viewport size changes
    fixNavCenter();
    
    adjustFootWidth();
    
    resizeImg();

    adjustNavH();
    
  });
  
});