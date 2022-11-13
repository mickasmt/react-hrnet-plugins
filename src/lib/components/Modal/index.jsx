import React from "react";
import { Fragment } from "react";
import PropTypes from "prop-types";

/**
 * Modal Component
 * @param {React.ReactNode} icon Icon  top left on the modal 
 * @param {string} iconBgColor Background color for the icon
 * @param {string} title Title of the modal
 * @param {string} description Description of the modal
 * @param {Array} buttons Array of the buttons in footer modal
 * @param {function} onClose Function for close the modal
 * @param {React.ReactNode} children 
 * @param {string} overlayColor Background color for the modal overlay
 * @param {string} overlayOpacity Opacity of background color for the modal overlay
 * @returns {React.ReactElement}
 */
function Modal({
  icon,
  iconBgColor,
  title,
  description,
  buttons,
  onClose,
  children,
  overlayColor,
  overlayOpacity,
}) {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 transition-opacity"
        style={{
          background: overlayColor,
          opacity: overlayOpacity,
        }}
      ></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="confirmation-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {icon && (
                  <div
                    className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                    style={{
                      backgroundColor: iconBgColor,
                    }}
                  >
                    {icon}
                  </div>
                )}

                <div className="my-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  {title && (
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {title}
                    </h3>
                  )}

                  {description && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  )}

                  {children}
                </div>
              </div>
            </div>
            {buttons.length > 0 && (
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {buttons.map((button, idx) => (
                  <Fragment key={idx}>
                    {button}
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  icon: PropTypes.string,
  iconBgColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  buttons: PropTypes.array,
  onClose: PropTypes.func,
  children: PropTypes.elementType,
  overlayColor: PropTypes.string,
  overlayOpacity: PropTypes.string,
};

export default Modal;
