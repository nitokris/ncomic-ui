import { Notify } from 'quasar'

export default {
  showSuccNotif(message: string) {
    Notify.create({
      message,
      color: 'positive',
      icon: 'done',
      timeout: 500
    })
  },

  showWarnNotif(message: string) {
    Notify.create({
      message,
      color: 'warning',
      icon: 'warning',
    })
  },

  showErrNotif(message: string) {
    Notify.create({
      message,
      color: 'negative',
      icon: 'bug_report'
    })
  }

}
