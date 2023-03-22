import { Toast } from '@capacitor/toast';
import { Glassfy, GlassfyOffering, GlassfyPermission, GlassfySku, GlassfyTransaction } from 'capacitor-plugin-glassfy';
import { BehaviorSubject } from 'rxjs';

const showToast = async (msg: string) => {
  await Toast.show({
    text: msg,
  });
};

export default class GlassfyService {
  // Init an "empty" user
  user = new BehaviorSubject({ pro: false });

  // @ts-expect-error
  private offerings: BehaviorSubject<GlassfyOffering[]> = new BehaviorSubject([]);

  constructor() {
    this.initGlassfy();
  }

  async initGlassfy() {
    try {
      // Initialise Glassfy
      await Glassfy.initialize({
        apiKey: '393489baa5b44bf7a9af2975f6ee2d01',
        watcherMode: false,
      });

      // Get all user permissions
      const permissions = await Glassfy.permissions();
      this.handleExistingPermissions(permissions.all);

      // Get all offerings (products)
      const offerings = await Glassfy.offerings();
      this.offerings.next(offerings.all);
    } catch (e) {
      console.log('init error: ', e);
    }
  }

  async purchase(sku: GlassfySku) {
    try {
      const transaction = await Glassfy.purchaseSku({ sku });
      if (transaction.receiptValidated) {
        this.handleSuccessfulTransactionResult(transaction, sku);
      }
    } catch (e) {
      console.error('glassfy purchase error', e);

      showToast('Purchase failed');
    }
  }

  handleExistingPermissions(permissions: GlassfyPermission[]) {
    for (const permission of permissions) {
      console.log(
        '🚀 ~ file: glassfy.ts ~ line 60 ~ GlassfyService ~ handleExistingPermissions ~ permission',
        permission,
      );
      if (permission.isValid) {
        if (permission.permissionId === 'pro') {
          const user = this.user.getValue();
          user.pro = true;
          this.user.next(user);
        }
      }
    }
  }

  async handleSuccessfulTransactionResult(transaction: GlassfyTransaction, sku: GlassfySku) {
    if (transaction.productId.indexOf('chancey_pro_3.99') >= 0) {
      const user = this.user.getValue();
      user.pro = true;
      this.user.next(user);
    }

    showToast('Successfully Purchased Pro');
  }

  // Helper functions
  getOfferings() {
    return this.offerings.asObservable();
  }

  async restore() {
    const permissions = await Glassfy.restorePurchases();
    console.log(permissions);
    // Handle those permissions!
  }
}
