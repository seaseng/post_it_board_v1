var Board = function( selector ) {
  // Your board related code goes here
  // Use $elem to access the DOM element for this board
  var $elem = $( selector );
  var postIts = [];
  function initialize() {
    // What needs to happen when this object is created?
    $elem.click(function(e) {
      postIt = new PostIt(e.clientX, e.clientY);
      addPost(postIt);
    }).droppable({ 
      drop: handleDropEvent
    }).bind();
  }
  function handleDropEvent(event, ui) {
  }

  function addPost(postIt) {
    $elem.append(postIt.$element);
    postIts.push(postIt);
  }
  initialize();
};

// constructor format
// function PostIt (xpos, ypos) {}
var PostIt = function(xpos, ypos) {
  // Your post-it related code goes here
  this.xpos = xpos;
  this.ypos = ypos;
  this.content = '';

  var $templates = $('#board .templates');
  this.$element  = $templates.find('.post-it').clone();
  this.$header   = $templates.find('.header').clone();
  this.$content  = $templates.find('.content').clone();
  this.initialize();


};

//Jared says do not do this -- research!!
// PostIt.prototype = {
//   updateHeader: function() {
//   },
//   updateContent: function() {
//   }
// };

PostIt.prototype.initialize = function() {
  this.$element.append(this.$header).append(this.$content);
  this.bindEvents();
  this.setPosition(this.xpos, this.ypos);
};

PostIt.prototype.setPosition = function(xpos, ypos) {
  this.$element.css('left', xpos);
  this.$element.css('top', ypos);
};

PostIt.prototype.bindEvents = function() {

  var self = this;
  
  self.$element.resizable();
  self.$element.draggable({handle: ".header",
                            cursor: 'move',
                            delay:  100});
  // self.$element.draggable({ //handle: ".header", 
  //                           cursor: 'move',
  //                           start: function(event, ui) {
  //                             ui.helper.bind("click.prevent", 
  //                               function(event) { event.preventDefault(); });
  //                           },
  //                           stop: function(event, ui) {
  //                             setTimeout(function() {
  //                               ui.helper.unbind("click.prevent");}, 300);
  //                           }
  // });

  this.$header.click(function(e) {
    e.stopPropagation();
  });

  

  this.$content.click(function(e) {
    e.stopPropagation();
  }).keyup(function(e) {
    e.stopPropagation();
    this.content = $(this).text();
  });

  this.$header.find('span').click(function(e) {
    e.stopPropagation();
    $(this).parent().parent().remove();
  });

};

PostIt.prototype.updateHeader = function(header) {
  this.$header.text(header);
};

PostIt.prototype.updateContent = function(content) {
  this.$content.text(content);
};

// same as $(document).ready(function () {
// });
$(function() {
  // This code will run when the DOM has finished loading
  board = new Board ('#board');
});