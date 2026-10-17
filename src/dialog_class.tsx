type Platform = "windows" | "web" | "macOS";
// Factory Method
interface Button {
  render(): void;
  onClick(handler: () => void): void;
}

class WindowsButton implements Button {
  private handler: (() => void) | null = null;

  render(): void {
    console.log("[Windows] Drawing a native OS button")
  }

  onClick(handler: () => void): void {
    console.log("[Windows] Binding a native click event");
    this.handler = handler;
  }
}

class HTMLButton implements Button {
  private handler: (() => void) | null = null;

  render(): void {
    console.log("[Web] Rendering <button>OK</button>")
  }

  onClick(handler: () => void): void {
    console.log("[Web] Adding a browser 'click' listener");
    this.handler = handler;
  }
}

class MacOSButton implements Button {
  private handler: (() => void) | null = null;
  render(): void {
    console.log("[MacOS] Drawing a native OS button")
  }

  onClick(handler: () => void): void {
    console.log("[MacOS] Binding a native click event");
    this.handler = handler;
  }
}

abstract class Dialog {
  abstract createButton(): Button;
  render(): void {
    const okButton = this.createButton();
    okButton.onClick(() => this.close());
    okButton.render();
  }

  close(): void {
    console.log("Dialog closed")
  }
}

class WindowsDialog extends Dialog { override createButton(): Button { return new WindowsButton() } }
class WebDialog extends Dialog { override createButton(): Button { return new HTMLButton() } }
class MacOSDialog extends Dialog { override createButton(): Button { return new MacOSButton() } }

interface AppConfig { platform: Platform }

class Application {
  private readonly dialog: Dialog;
  constructor(config: AppConfig) {
    this.dialog = Application.chooseDialog(config.platform)
  }

  private static chooseDialog(platform: Platform): Dialog {
    switch (platform) {
      case "windows":
        return new WindowsDialog();
      case "web":
        return new WebDialog();
      case "macOS":
        return new MacOSDialog();
      default: {
        const unknown: never = platform;
        throw new Error(`Unknown platform: ${String(unknown)}`)
      }
    }
  }

  run(): void {
    this.dialog.render()
  }
}
new Application({ platform: "windows" }).run(); 
new Application({ platform: "web" }).run();
new Application({ platform: "macOS" }).run();
