import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap"
import { useAppSelector } from "utils/hook/appHook"

export const ProcessDownloadFile = () => {
  const isShow = useAppSelector(state => state.layout.showDowloadFile)
  return (
    <Modal isOpen={isShow}>
      <ModalHeader>Đang tải file vui lòng chờ</ModalHeader>
      <ModalBody>
        <div className="d-flex align-item-center justify-content-center">
          <Spinner size="14" />
        </div>
      </ModalBody>
    </Modal>
  )
}
