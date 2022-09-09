import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

export class Notification {
    private permissionGranted = false;

    constructor() {
        this.checkPermission();
    }

    public send(message: string): void {
        if (!this.permissionGranted) {
            return;
        }

        sendNotification({ title: 'Calrissian', body: message });
    }

    private async checkPermission() {
        let permissionGranted = await isPermissionGranted();
        if (!permissionGranted) {
            const permission = await requestPermission();
            permissionGranted = permission === 'granted';
        }

        this.permissionGranted = permissionGranted;
    }
}
