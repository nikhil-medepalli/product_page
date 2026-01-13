export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  return (
    <dialog id="confirm_modal" className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Action</h3>
        <p className="py-4">{message}</p>

        <div className="modal-action">
          <button className="btn btn-error" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
