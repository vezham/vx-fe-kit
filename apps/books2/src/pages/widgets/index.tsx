import CalendarAppWidget from '../../pages/widgets/calendar/calendar'
import Health from '../../pages/widgets/health/health'
import Mail from '../../pages/widgets/mail/mail'
import Maps from '../../pages/widgets/maps/maps'
import Messages from '../../pages/widgets/messages/messages'
import Music from '../../pages/widgets/music/music'
import Phone from '../../pages/widgets/phone/phone'
import Photos from '../../pages/widgets/photos/photos'
import Settings from '../../pages/widgets/settings/settings'

export default function WidgetsGrid() {
  return (
    <div className="grid gap-6 p-4">
      <Phone />
      <Messages />
      <Mail />
      <CalendarAppWidget />
      <Music />
      <Health />
      <Settings />
      <Photos />
      <Maps />
    </div>
  )
}
