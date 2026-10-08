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

    //% block="move selection $direction"
    //% direction.min=-1 direction.max=1
    export function move(direction: number) {
        if (!opened || items.length == 0) return

        selected += direction

        if (selected < 0)
            selected = items.length - 1

        if (selected >= items.length)
            selected = 0

        draw()
    }

    //% block="selected item"
    export function selectedItem(): number {
        return selected
    }

    function draw() {
        screen.fill(0)

        for (let i = 0; i < items.length; i++) {
            let y = 35 + i * 25

            if (i == selected)
                screen.print("> " + items[i], 35, y, 1)
            else
                screen.print(items[i], 45, y, 1)
        }
    }
}
