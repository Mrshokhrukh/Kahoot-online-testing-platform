import { Download } from 'lucide-react'
import AppButton from '../shared/AppButton'

const CSV_HEADER_LINE = 'Ism,Ball,Foiz'
const CSV_FILE_NAME = 'natijalar.csv'

function buildCsvContent(scoreList) {
  const rowLineList = scoreList.map((item) => `${item.name},${item.score},${item.percentage}`)
  return [CSV_HEADER_LINE, ...rowLineList].join('\n')
}

function ExportButton({ scoreList }) {
  const hasNoScores = !scoreList || scoreList.length === 0

  const handleExportClick = () => {
    const csvBlob = new Blob([buildCsvContent(scoreList)], { type: 'text/csv' })
    const downloadUrl = URL.createObjectURL(csvBlob)
    const downloadLink = document.createElement('a')
    downloadLink.href = downloadUrl
    downloadLink.download = CSV_FILE_NAME
    downloadLink.click()
    URL.revokeObjectURL(downloadUrl)
  }

  return (
    <AppButton variant="secondary" onClick={handleExportClick} isDisabled={hasNoScores}>
      <Download className="w-4 h-4 mr-2" />
      CSV eksport
    </AppButton>
  )
}

export default ExportButton
