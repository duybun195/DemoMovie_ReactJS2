import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"
import { useReactToPrint } from "react-to-print"

const PageStyles = {
  mini: {
    landscape: "size: landscape",
  },
  A4: {
    portrait: "size: 297mm 209mm",
    landscape: "size: 209mm 297mm",
  },
  A5: {
    portrait: "size: 148mm 209mm",
    landscape: "size: 209mm 148mm",
  },
}
export interface MXPrinterProps {
  pageSize?: "A4" | "A5" | "mini"
  landscape?: boolean
  componentToPrint: any
  data: any
}
export interface MXPrinterRef {
  print: () => void
}
const MXPrinter = forwardRef<MXPrinterRef, MXPrinterProps>(
  ({ pageSize, landscape, componentToPrint: ComponentToPrint, data }, ref) => {
    pageSize = pageSize || "A4"
    const type = landscape ? "landscape" : "portrait"
    const componentRef = useRef<HTMLDivElement>(null)
    const reactToPrintContent = useCallback(() => {
      return componentRef.current
    }, [componentRef.current])

    const handlePrint = useReactToPrint({
      content: reactToPrintContent,
      pageStyle: PageStyles[pageSize][type],
    })
    useImperativeHandle(ref, () => ({ print }))
    const print = () => {
      handlePrint && handlePrint()
    }
    return (
      <div>
        <ComponentToPrint ref={componentRef} info={data} />
      </div>
    )
  },
)
export default MXPrinter
