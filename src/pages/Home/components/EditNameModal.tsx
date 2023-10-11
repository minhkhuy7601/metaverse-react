import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setShowEditNameModal } from "@/redux/slices/actionSlice";
import { RootState } from "@/redux/store";
import { Dialog } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function EditNameModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.actionSlice.isShowEditNameModal
  );
  console.log("isOpen", isOpen);

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(setShowEditNameModal(false))}
      className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="relative mx-auto w-[450px] bg-[#202540] rounded-md overflow-hidden">
          <button
            className="absolute top-3 right-3 text-white"
            onClick={() => {
              dispatch(setShowEditNameModal(false));
            }}>
            <IoClose size={25} />
          </button>
          <div className="h-52 w-full bg-[#333A64]"></div>
          <div className="py-6 px-8 text-white flex flex-col items-center">
            <h2 className="font-semibold text-lg w-full">What is your name?</h2>
            <p className="text-sm text-indigo-200 mt-3 mb-6">
              Your name shows above your character. You’ll be able to change it
              anytime.
            </p>
            <Input className="text-white" />
            <Button className="bg-[#06D6A0] hover:bg-[#75cab4] duration-150 mx-auto mt-4 text-[#202540] px-10">
              Finish
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
