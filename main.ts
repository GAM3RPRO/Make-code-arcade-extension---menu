namespace miniMenu {
    let items: string[] = []
    let selected = 0
    let opened = false

    //% block="create menu"
    export function create() {
        items = []
        selected = 0
        opened = false
    }

    //% block="add menu item $name"
    //% name.defl="PLAY"
    export function addItem(name: string) {
        items.push(name)
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
        screen.fill(0)
    }

    //% block="move menu $direction"
    //% direction.shadow=directionPicker
    export function move(direction: number) {
        if (!opened || items.length == 0) return

        selected += direction

        if (selected < 0)
            selected = items.length - 1

        if (selected >= items.length)
            selected = 0

        draw()
    }

    //% block="selected menu item"
    export function selectedItem(): number {
        return selected
    }

    //% block="menu is open"
    export function isOpen(): boolean {
        return opened
    }

    function draw() {
        screen.fill(0)

        for (let i = 0; i < items.length; i++) {
            let y = 30 + i * 20

            if (i == selected) {
                screen.print("> " + items[i], 30, y, 1)
            } else {
                screen.print(items[i], 40, y, 1)
            }
        }
    }
}
