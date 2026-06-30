import { Route, Routes } from 'react-router-dom'
import FeedLayout from './components/FeedLayout'
import { ToastProvider } from './components/ToastProvider'
import CommerceProfilePage from './pages/CommerceProfilePage'
import EventDetailPage from './pages/EventDetailPage'
import FeedPage from './pages/FeedPage'
import MarketplaceDetailPage from './pages/MarketplaceDetailPage'

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<FeedLayout />}>
          <Route index element={<FeedPage />} />
        </Route>
        <Route path="event/:eventId" element={<EventDetailPage />} />
        <Route path="commerce/:profileId" element={<CommerceProfilePage />} />
        <Route
          path="marketplace/:listingId"
          element={<MarketplaceDetailPage />}
        />
      </Routes>
    </ToastProvider>
  )
}
