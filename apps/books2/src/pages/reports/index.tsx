import AppContainerHeader from '../../layouts/app-container-header'

const Reports = () => {
  return (
    <div className="p-6">
      <AppContainerHeader
        onSearch={v => console.log(v)}
        onAdd={() => console.log('add')}
      />
      Reports
    </div>
  )
}

export default Reports
