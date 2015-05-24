# React Paginatr

**Easy pagination mixin and component for React.**

Will add easy pagination with help of Array.slice function to display paginated lists.
Includes a react mixin to easily slice the results and a pagination view component (uses a simple list by default - compatible with bootstrap).


## Installation:

Install react-paginatr with npm:

```console
$ npm install react-paginatr
```


## Usage:

require it in files to use and define Mixin and Component:
```javascript
    var Paginatr = require('react-paginatr'),
        PaginatrMixin = Paginatr.Mixin,
        PaginatrComponent = Paginatr.Component;
```


### Paginating data:

use the paginate function in the mixin to get the array part for this page.
this will use the *_page* state attribute as current page by default

add the mixin:

```javascript
    ...
    mixins: [PaginatrMixin],
    ...
```


use the paginate method:
```javascript
   var paginatedResults = this.paginate(data, perPage, _page);
```


that's what it could look like:

```javascript
    
    module.exports = React.createClass({
    
          ...
          
          mixins: [PaginatrMixin],
          
          ...
          
          render: function() {
          
              // paginate the full set of results in this.props.results
               var paginatedResults = this.paginate(this.props.results);
              
              // map results
               var Results = paginatedResults.map(function(result)
                         {
                             return (
                                <ResultItem key={'key-'+ result.id} result={result} />
                             );
                         }); 
                         
              // display it
               return (
                  <div>
                     {Results}
                  </div>
               );
                      
           },
           
           ...
     
     });
```


#### paginate method
```javascript
   this.paginate(data, perPage, _page)
```
     
     
###### array `data`
An array with items to paginate.

```javascript
 var data = [
              { id: 1, name: 'Pete' },
              { id: 1, name: 'Miriam' },
              { id: 1, name: 'Heinz' },
              { id: 1, name: 'Brunhilde' }
            ];
```


###### integer `perPage` (default: 12)
the number of items per page


###### integer `_page` (optional | defaults to: this.state._page)
current page number. If not set it will use this.state._page. (only needs to be set in special situations)




### Pagination Component:

displaying the pagination box is quite easy. Just drop the pagination component in there:

```javascript
    ...
    
    render: function() {
        ...
          <PaginatrComponent 
                  page={2}                         // int: current page number - required
                  pagesTotal=[10}                  // int: number of total pages - required
                  pageRangeDisplayed={1}           // int: how much around start and end should be displayed by default (default: 1)
                  activePageRangeDisplayed={2}     // int: how much around active page should be displayed by default (default: 2)
                  prevLabel="«"                    // string: label for previous entry - false to disable previous button (default: "Previous")
                  nextLabel="»"                    // string: label for next entry - false to disable next button (default: "Next")
                  breakLabel="...     "            // string: label for breaks if there are too many pages to display at once - false to disable breaks (default: "...")
                  containerClass="paginator"       // string: label for breaks if there are too many pages to display at once - false to disable breaks (default: "...")
                  onPageSelect={this.onPageSelect} // func: the function to change the page number. the mixin already adds a simple onPageSelect method. If you need more overwrite it.
          />
        ... 
     },
     
     ...
```






### More Customization:


#### use different method on page change

if you want to use a different method on page (maybe to do something else), just create your own onPageSelect method (use a different name - to prevent duplicate method error) and assign that to your component.

example:

```javascript
    ...
    
    onPageSelectCustom: function(_page, clickEvent) {
      
       // do here whatever you need to do
        console.log('the page: '+ _page);
       
       // the following is what we do in the onPageSelect method in mixin (surprise: no big magic there)
        this.setState({ _page: _page });
      
    },
    
    render: function() {
        ...
          <PaginatrComponent 
                  page={2}
                  pagesTotal=[10}
                  onPageSelect={this.onPageSelectCustom} // just use your function here
           />
        ... 
     },
     
     ...
```
     
 
