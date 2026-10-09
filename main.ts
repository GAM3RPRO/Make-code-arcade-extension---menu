namespace miniMenu {
    let items: string[] = []
    let selected = 0
    let opened = false
    let menu: Sprite = null

    //% block="create menu"
    export function create() {
        if (menu) menu.destroy()
        items = []
        selected = 0
        opened = false
        menu = null
    }

    //% block="add menu item $name"
    //% name.defl="PLAY"
    export function addItem(name: string) {
        items.push(name)
        if (opened) draw()
    }

    //% block="open menu"
    export function open() {
        opened = true
        selected = 0
        draw()
    }

    //% block="close menu"
    export function close() {
        opened = false
        if (menu) {
            menu.destroy()
            menu = null
        }
    }

    //% block="move menu $amount"
    export function move(amount: number) {
        if (!opened || items.length == 0) return

        selected += amount

        if (selected < 0) selected = items.length - 1
        if (selected >= items.length) selected = 0

        draw()
    }

    //% block="selected menu item"
    export function selectedItem(): number {
        return selected
    }

    //% blockId=miniMenuOnItemPressed
    //% block="on menu item $name pressed"
    //% handlerStatement=1
    //% name.defl="PLAY"
    export function onItemPressed(name: string, handler: () => void): void {
        controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
            if (opened && items.length > 0 && items[selected] == name) {
                handler()
            }
        })
    }

    function draw() {
        if (!opened || items.length == 0) return

        let h = items.length * 18 + 10
        if (h > 110) h = 110

        let img = image.create(120, h)
        img.fill(1)

        for (let i = 0; i < items.length; i++) {
            let y = 5 + i * 18

            if (i == selected) {
                img.fillRect(3, y - 2, 114, 16, 2)
                img.print("> " + items[i], 7, y, 15)
            } else {
                img.print(items[i], 10, y, 15)
            }
        }

        if (menu) {
            menu.setImage(img)
        } else {
            menu = sprites.create(img, SpriteKind.create())
            menu.setPosition(80, 60)
            menu.setFlag(SpriteFlag.Ghost, true)
            menu.z = 1000
        }
    }
}
