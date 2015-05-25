'use strict';

var PaginatrMixin = 
  {


       getInitialState: function() {
           return {
             _page: 0
           }
       },

      paginate: function(data, perPage, _page)
       {
       
           // if we got no data -> return empty array
            if(data.length < 1) return null;

           // define _page
            var _page = (_page) ? _page : this.state._page;
            
           // define the start
            var start = (_page * perPage);
            var end = start + perPage;

           // only get the last data in there
            var retArr = data.slice(start, end);
            
           // if no data found -> set page to null
            if(retArr.length < 1) this.setState({ _page: 0 }); 

           // return the array
            return retArr;

       },


      onPageSelect: function(_page, clickEvent)
       {

           // change _page state
            this.setState({ _page: _page });

       }



 };
 
 
module.exports = PaginatrMixin; 
