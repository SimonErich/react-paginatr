'use strict';

var React = require('react');


var Paginatr = React.createClass({displayName: "Paginatr",


     propTypes: {
        page                        : React.PropTypes.number.isRequired,
        pagesTotal                  : React.PropTypes.number.isRequired,
        pageRangeDisplayed          : React.PropTypes.number,
        activePageRangeDisplayed    : React.PropTypes.number,
        prevLabel                   : React.PropTypes.string,
        nextLabel                   : React.PropTypes.string,
        breakLabel                  : React.PropTypes.string,
        containerClass              : React.PropTypes.string,
        onPageSelect                : React.PropTypes.func
     },

     getDefaultProps: function() {
        return {
          page                 : 0,
          pagesTotal           : 10,
          pageRangeDisplayed   : 1,
          activePageRangeDisplayed : 1,
          prevLabel            : "«",
          nextLabel            : "»",
          breakLabel           : "...",
          containerClass       : "pagination"
        };
     },


    onPageSelect: function(e)
    {

        // get the selected page
         var thePage = e.currentTarget.getAttribute('data-page');

        // call props function
         if(this.props.onPageSelect) this.props.onPageSelect(thePage, e);

        // prevent Default
         e.preventDefault();

    },


    createPageArr: function()
    {

         var pageArr = [];

         // if we got less pages than to be displayed
          if(this.props.pagesTotal <= this.props.pageRangeDisplayed)
          {

               // just create a map
                return Array(parseInt((this.props.pagesTotal - 1)));

          }

        // else if we got more -> we need a little bit of magic
         else
          {

              // shortcut all
               var pagesTotal = parseInt(this.props.pagesTotal),
                   page = parseInt(this.props.page),
                   activePageRangeDisplayed = parseInt(this.props.activePageRangeDisplayed),
                   pageRangeDisplayed = this.props.pageRangeDisplayed,
                   activeRangeStart = (page - activePageRangeDisplayed),
                   activeRangeEnd = page + activePageRangeDisplayed,
                   lastRange = (pagesTotal - pageRangeDisplayed),
                   lastI = 0,
                   currentI = 0;


              // walk through all pages and formulate them
               for(var i = 0; i < pagesTotal; i++)
               {

                     if(
                        // if this page is one of the starting pages
                         i < pageRangeDisplayed ||

                        // else if the page is within the active range
                         (i >= activeRangeStart && i <= activeRangeEnd) ||

                        // or if page is at the end
                         (i >= lastRange)
                       )
                          {
                             currentI = i;
                          }

                    // else add a break
                     else currentI = 'break';


                    // if we haven't just used a break and this one is too -> add the current I
                     if(lastI == 'break' && currentI == 'break') continue;
                     else pageArr.push(currentI);


                    // set the last i
                     lastI = currentI;


               } // END for


              // return the array
               return pageArr;


          }

    },

    render: function()
    {

         // if we got less than 1 page -> return nothing
          if(this.props.pagesTotal < 2) return null;
          
         // get current page
          var page = this.props.page,
              breakLabel = this.props.breakLabel;

         // create map
          var that = this;
          var Pages = this.createPageArr(). map(function(p, i)
          {

              if(p == 'break') return ( React.createElement("li", {key: 'pgn'+ p +'-'+ i}, React.createElement("span", null, breakLabel)) );

              // display page number
               if(page != p)
               {
                  return React.createElement("li", {key: 'pgn'+ p +'-'+ i}, React.createElement("a", {href: "#", "data-page": p, onClick: that.onPageSelect}, (p + 1)));
               }
               else
               {
                  return React.createElement("li", {key: 'pgn'+ p +'-'+ i, className: "active"}, React.createElement("span", null, (p + 1)));
               }


          });

        // render it
         return (
            React.createElement("ul", {className: this.props.containerClass}, 
                 (this.props.prevLabel == false || page == 0) ? null :
                    React.createElement("li", {key: "pgn-prev"}, React.createElement("a", {href: "#", "data-page": (page - 1), onClick: that.onPageSelect}, this.props.prevLabel)),
                

               Pages, 


                 (this.props.nextLabel == false || page == this.props.pagesTotal) ? null :
                    React.createElement("li", {key: "pgn-next"}, React.createElement("a", {href: "#", "data-page": (page + 1), onClick: that.onPageSelect}, this.props.nextLabel))
                
            )
         );


    }

});


module.exports = Paginatr;
