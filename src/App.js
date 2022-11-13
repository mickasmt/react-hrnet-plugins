import "./index.css";
import { DatePicker, Modal, Select, Table } from "lib";

// data
import data from "data/mocks.json";
import { useState } from "react";

// icons
import { ReactComponent as Check } from "assets/icons/check.svg";

function App() {
  const today = new Date();
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);

  return (
    <div className="f-container py-10 space-y-8">
      <h1 className="text-xl text-gray-900">Example :</h1>

      <DatePicker
        id="datepicker"
        value={today}
        name="startDate"
        // min={today}
        maxDate={today}
      />

      <Select
        name="department"
        options={data.departments}
        selected={data.departments[2].value}
        placeholder="Select a department"
        styles="w-full mt-4 rounded-md border-gray-200 shadow-sm sm:text-sm"
      />

      <div>
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
        >
          Open modal
        </button>

        {openModal && (
        <Modal
          icon={<Check className="h-6 w-6 text-green-700" />}
          iconBgColor="#E7FCDC"
          overlayColor="#4b5563"
          overlayOpacity={0.75}
          title="Employee created !"
          description="Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
          onClose={() => closeModal()}
          buttons={[
            <button
              type="button"
              onClick={() => closeModal()}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-lime-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-800 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>,
            <button
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              View all employees
            </button>,
          ]}
        />
      )}
      </div>

      <Table
        items={data.employees}
        columns={data.columns}
        selectDisplayItems={data.selectItemsTable}
      />
    </div>
  );
}

export default App;
