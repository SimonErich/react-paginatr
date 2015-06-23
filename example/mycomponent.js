var React = require('react');
var Paginatr = require('react-paginatr');
var PaginatrMixin = Paginatr.Mixin,
    PaginatrComponent = Paginatr.Component;

var Mycomponent = React.createClass({


   mixins: [PaginatrMixin],

   resultsPerPage: 2,

   render: function() {


                  var dataArr = [
                                    { id: 1, name: 'Pete' },
                                    { id: 2, name: 'Miriam' },
                                    { id: 3, name: 'Heinz' },
                                    { id: 4, name: 'Brunhilde' }
                                ];
                  var pagesTotal = Math.ceil(dataArr.length / this.resultsPerPage);

                 // paginate the full set of results in this.props.results
                  var paginatedResults = this.paginate(dataArr,                     // the data array
                                                       this.resultsPerPage,         // number of results per page
                                                       this.state._page);           // (optional) the current page (only if you want to override current page)


                 // map results
                  var Results = paginatedResults.map(function(result)
                            {
                                return (
                                   <div key={'key-' + result.id}>{result.name}</div>
                                );
                            });

                 // display it
                  return (
                     <div className="text-center">
                        <h1>Paginated</h1>
                        {Results}
                        <PaginatrComponent
                                    page={this.state._page}
                                    pagesTotal={pagesTotal}
                                    pageRangeDisplayed={1}
                                    activePageRangeDisplayed={2}
                                    prevLabel="«"
                                    nextLabel="»"
                                    breakLabel="...     "
                                    containerClass="pagination"
                                    onPageSelect={this.onPageSelect}
                            />
                     </div>
                  );

              }
});

export default Mycomponent;
