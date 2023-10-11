import { resetQA } from "@/redux/slices/popupQASlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const ModalQA = () => {
	const qa = useSelector((state: RootState) => state.popupQASlice);
	const dispatch = useDispatch();
	if (!qa.question?.length) return <></>;
	const onClose = () => {
		dispatch(resetQA());
	};
	return (
		<div
			id="defaultModal"
			tabIndex={-1}
			aria-hidden="true"
			className="w-full h-full z-50 absolute top-0 ">
			<div className="relative w-full max-h-full">
				{/* Modal content */}
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					{/* Modal header */}
					<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							Answer the question?
						</h3>
						<button
							type="button"
							onClick={onClose}
							className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					{/* Modal body */}
					<div className="p-6 space-y-6">
						<p className="font-bold leading-relaxed text-2xl text-black">
							{qa.question.join("_ _ _")}
						</p>
						<input
							type="search"
							id="default-search"
							className="block w-full p-4 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Response..."
							required></input>
					</div>
					{/* Modal footer */}
					<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
						<button
							data-modal-hide="defaultModal"
							type="button"
							onClick={onClose}
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
							Submit
						</button>
						<button
							data-modal-hide="defaultModal"
							type="button"
							onClick={onClose}
							className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
							Decline
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalQA;
