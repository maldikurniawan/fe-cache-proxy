import React, { Fragment } from "react";
import { icons } from "../../../public/assets/icons";

const Inputs = ({ inputs, setInputs, handleInput }) => {
  const handleInputGroup = (e, index, index2, index3) => {
    const newInputs = [...inputs];
    if (e.target.type === "file") {
      newInputs[index]["groupInput"][index2][index3]["value"] = e.target.value;
      newInputs[index]["groupInput"][index2][index3]["data"] =
        e.target.files[0];
    } else {
      newInputs[index]["groupInput"][index2][index3]["value"] = e.target.value;
    }
    setInputs(newInputs);
  };
  const handleAddGroup = (inputIdx, items) => {
    const newInputs = [...inputs];
    const newItem = items.map((item) => (item = { ...item, value: "" }));
    newInputs[inputIdx]["groupInput"] = [
      ...newInputs[inputIdx]["groupInput"],
      newItem,
    ];
    setInputs(newInputs);
  };
  const handleDeleteGroup = (inputIdx, itemIdx) => {
    const newInputs = [...inputs];
    newInputs[inputIdx]["groupInput"].splice(itemIdx, 1);
    setInputs(newInputs);
  };

  return (
    <div>
      {inputs &&
        inputs.map((input, inputIdx) => {
          if (
            input.type === "text" ||
            input.type === "number" ||
            input.type === "date"
          ) {
            return (
              <div key={inputIdx}>
                <label className="font-medium">{input.label}</label>
                <input
                  min={input.min}
                  max={input.max}
                  className="bg-white w-full shadow p-3 rounded-lg mb-3 mt-1"
                  type={input.type}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={(e) => handleInput(e, inputIdx)}
                />
              </div>
            );
          }

          if (input.type === "select") {
            return (
              <div key={inputIdx}>
                <label className="font-medium">{input.label}</label>
                <select
                  className={`bg-white w-full shadow p-3 rounded-lg mb-3 mt-1 ${
                    input.value === "" ? "text-gray-400" : ""
                  }`}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={(e) => handleInput(e, inputIdx)}
                >
                  <option value="" disabled>
                    {input.placeholder}
                  </option>
                  {input.options &&
                    input.options.map((option, optionIdx) => (
                      <option
                        className="text-gray-800"
                        key={optionIdx}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                </select>
              </div>
            );
          }

          if (input.type === "textarea") {
            return (
              <div key={inputIdx}>
                <label className="font-medium">{input.label}</label>
                <textarea
                  className="bg-white w-full shadow p-3 rounded-lg mb-3 mt-1 h-40 custom-scroll"
                  type={input.type}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={(e) => handleInput(e, inputIdx)}
                />
              </div>
            );
          }

          if (input.type === "file") {
            return (
              <div key={inputIdx}>
                <label className="font-medium">{input.label}</label>
                <input
                  className="bg-white w-full shadow p-3 rounded-lg mb-3 mt-1 file:border-none file:px-3 file:py-1 file:rounded-lg text-sm"
                  type={input.type}
                  placeholder={input.placeholder}
                  value={input.value}
                  accept={input.accept}
                  onChange={(e) => handleInput(e, inputIdx)}
                />
              </div>
            );
          }

          if (input.type === "group-input") {
            return (
              <div key={inputIdx}>
                <div
                  className={`w-full flex justify-between items-center mb-1`}
                >
                  <label className="font-medium">{input.label}</label>
                  {input.addButton && (
                    <div className="flex">
                      {input.groupInput.length > 1 && (
                        <div
                          className="p-1.5 flex items-center mr-2 rounded bg-[#f3f4f6] cursor-pointer"
                          onClick={() =>
                            handleDeleteGroup(
                              inputIdx,
                              input.groupInput.length - 1
                            )
                          }
                        >
                          <span>{icons.fix}</span>
                        </div>
                      )}
                      <div
                        className="p-1.5 flex items-center rounded bg-[#f3f4f6] cursor-pointer"
                        onClick={() =>
                          handleAddGroup(inputIdx, input.groupInput[0])
                        }
                      >
                        <span>{icons.aioutlineplus}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full">
                  {input.groupInput.map((itemGroup, itemGroupIdx) =>
                    itemGroup.map((item, itemIdx) => {
                      // Group input
                      if (item.type === "text") {
                        return (
                          <div key={inputIdx}>
                            <input
                              className="bg-white w-full shadow p-3 rounded-lg my-1"
                              type={item.type}
                              placeholder={item.placeholder}
                              value={item.value}
                              onChange={(e) =>
                                handleInputGroup(
                                  e,
                                  inputIdx,
                                  itemGroupIdx,
                                  itemIdx
                                )
                              }
                            />
                          </div>
                        );
                      }

                      return <Fragment key={inputIdx}></Fragment>;
                    })
                  )}
                </div>
              </div>
            );
          }

          return <Fragment key={inputIdx}></Fragment>;
        })}
    </div>
  );
};

export default Inputs;
