import Terminal from "@/Tools/Console/Terminal"
import Navigator from "@/Tools/Navigator"

/*
|-----------------------------
|  Web builder
|-----------------------------
|
|
*/
export default async function () {

    // Open terminal
    const terminal = new Terminal

    // Build Web
    terminal.break.step("Build Web").break

    // Source path
    const sourcePath = "source/web"

    // Distribution path
    const distPath = "dist/web"

    // Make source
    const source = new Navigator(sourcePath)

    // Make distribution
    const distribution = new Navigator(distPath, { force: true })

    // Clear distribution
    await distribution.clear()

    // Run build command
    source.execute("npm run build")

    // Move to distribution
    await source.go("dist").move(distPath)
}