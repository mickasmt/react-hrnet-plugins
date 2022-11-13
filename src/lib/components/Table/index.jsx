import React, { useMemo, useState } from "react";
import Select from "../Select";
import Pagination from "./Pagination";
import Search from "./Search";

function Table({ items, columns, selectDisplayItems }) {
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(selectDisplayItems[0].value);

  const data = useMemo(() => {
    let computedItems = items;

    if (search) {
      computedItems = computedItems.filter(
        (item) =>
          Object.values(item).some(el => el.toLowerCase().includes(search.toLowerCase()))
      );
    }

    setTotalItems(computedItems.length);

    //Current Page slice
    return computedItems.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage
    );
  }, [items, currentPage, itemsPerPage, search]);

  return (
    <div>
      {/* Select | Search */}
      <div className="flex justify-between items-center pb-3">
        <div className="flex space-x-1.5 items-center text-gray-700">
          <span>Show</span>
          <Select
            selected={selectDisplayItems[0].value}
            options={selectDisplayItems}
            onSelect={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1);
            }}
            styles="w-16 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1"
          />
          <span>entries</span>
        </div>

        <Search
          onSearch={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full border text-center">
                {/* Header Table */}
                <thead className="border-b">
                  <tr>
                    {columns.map((column) => {
                      return (
                        <th
                          key={column.title}
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-5 py-3 border-r"
                        >
                          {column.title}
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {/* Body Table */}
                <tbody>
                  {data.length > 0 ? (
                    <>
                      {data.map((obj, idx) => {
                        return (
                          <tr key={idx} className="border-b">
                            {columns.map((column, idx) => {
                              return (
                                <td
                                  key={idx}
                                  className="text-sm text-gray-700 px-5 py-3 whitespace-nowrap border-r"
                                >
                                  {obj[column.data]}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr className="border-b">
                      <td
                        colSpan={columns.length}
                        className="text-sm text-gray-700 px-5 py-3 whitespace-nowrap bg-gray-100"
                      >
                        No matching records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Text | Pagination */}
      <Pagination
        total={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default Table;
