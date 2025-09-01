import Books from '../../pages/books'
import HeadContent from '../../pages/books/actionbar/headContent'
import TabContent from '../../pages/books/actionbar/tabContent'
const Index = () => {
  return (
    <Books headerEndContent={<HeadContent />} tabsEndContent={<TabContent />} />
  )
}

export default Index
