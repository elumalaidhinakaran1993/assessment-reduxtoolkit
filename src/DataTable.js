import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataStart,
  fetchDataSuccess,
  setSearchText,
  fetchDataFailure,
  setCurrentPage
} from "./apiSlice";
import { InputGroup, FormControl } from "react-bootstrap";

const DataTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error, currentPage, itemsPerPage, searchText } =
    useSelector((state) => state.api);

  const [filteredItems, setFilteredItems] = useState([]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedItems = filteredItems.slice(startIndex, endIndex);

  const handlePrevClick = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNextClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  useEffect(() => {
    setFilteredItems(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    dispatch(setCurrentPage(1));
  }, [data, searchText, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  useEffect(() => {
    dispatch(fetchDataStart());
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        dispatch(fetchDataSuccess(json));
      })
      .catch((error) => dispatch(fetchDataFailure(error.message)));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : filteredItems.length === 0 ? (
        <>
          <div className="container">
            <div className="mt-4">
              <div className="row text-center">
                <h4>Table</h4>
                <div className="col-4">
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Search by name"
                      aria-label="Search by name"
                      aria-describedby="basic-addon1"
                      value={searchText}
                      onChange={handleSearchChange}
                    />
                  </InputGroup>
                </div>
              </div>
            </div>
            Nodata found
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="mt-4">
              <div className="row text-center">
                <h4>Table</h4>
                <div className="col-4">
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Search by name"
                      aria-label="Search by name"
                      aria-describedby="basic-addon1"
                      value={searchText}
                      onChange={handleSearchChange}
                    />
                  </InputGroup>
                </div>
              </div>

              <table className="table border border-secondary">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>

                    <th>Tagline</th>
                  </tr>
                </thead>
                <tbody>
                  {slicedItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.tagline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-2 text-center p-2">
                <button
                  class="btn btn-secondary btn-sm"
                  onClick={handlePrevClick}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="mx-2">{currentPage}</span>
                <button
                  onClick={handleNextClick}
                  disabled={endIndex >= data.length}
                  class="btn btn-secondary btn-sm mx-2"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
