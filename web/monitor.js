import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

// Create the monitor UI element
const createMonitorElement = () => {
    // Create main container
    const container = document.createElement("div");
    container.className = "amd-gpu-monitor";
    container.style.position = "absolute";
    container.style.top = "40px"; // Moved down to avoid toolbar
    container.style.right = "5px";
    container.style.zIndex = "1000";
    container.style.backgroundColor = "#1a1a1a";
    container.style.color = "#fff";
    container.style.padding = "10px";
    container.style.borderRadius = "5px";
    container.style.fontFamily = "monospace";
    container.style.fontSize = "12px";
    container.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    container.style.width = "220px";
    container.style.userSelect = "none";
    
    // Add title
    const title = document.createElement("div");
    title.style.fontWeight = "bold";
    title.style.marginBottom = "5px";
    title.style.display = "flex";
    title.style.alignItems = "center";
    title.style.justifyContent = "space-between";
    title.innerHTML = '<span style="color: #ff5555;">AMD GPU Monitor</span>';
    
    // Add collapse button
    const collapseButton = document.createElement("button");
    collapseButton.innerHTML = "−"; // Unicode minus sign
    collapseButton.style.background = "none";
    collapseButton.style.border = "none";
    collapseButton.style.color = "#888";
    collapseButton.style.cursor = "pointer";
    collapseButton.style.fontSize = "14px";
    collapseButton.style.padding = "0 5px";
    collapseButton.title = "Collapse/Expand";
    
    // Add close button
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "×"; // Unicode times sign
    closeButton.style.background = "none";
    closeButton.style.border = "none";
    closeButton.style.color = "#888";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "14px";
    closeButton.style.padding = "0 5px";
    closeButton.title = "Close";
    
    const buttonContainer = document.createElement("div");
    buttonContainer.appendChild(collapseButton);
    buttonContainer.appendChild(closeButton);
    
    title.appendChild(buttonContainer);
    container.appendChild(title);
    
    // Content container that can be collapsed
    const content = document.createElement("div");
    content.className = "amd-gpu-monitor-content";
    container.appendChild(content);
    
    // GPU Utilization section
    const gpuSection = document.createElement("div");
    gpuSection.style.marginBottom = "8px";
    
    const gpuLabel = document.createElement("div");
    gpuLabel.textContent = "GPU Utilization:";
    gpuLabel.style.marginBottom = "2px";
    
    const gpuBarContainer = document.createElement("div");
    gpuBarContainer.style.height = "15px";
    gpuBarContainer.style.backgroundColor = "#333";
    gpuBarContainer.style.borderRadius = "3px";
    gpuBarContainer.style.position = "relative";
    
    const gpuBar = document.createElement("div");
    gpuBar.className = "amd-gpu-utilization-bar";
    gpuBar.style.height = "100%";
    gpuBar.style.width = "0%";
    gpuBar.style.backgroundColor = "#47a0ff";
    gpuBar.style.borderRadius = "3px";
    gpuBar.style.transition = "width 0.5s ease-out, background-color 0.3s";
    
    const gpuText = document.createElement("div");
    gpuText.className = "amd-gpu-utilization-text";
    gpuText.textContent = "0%";
    gpuText.style.position = "absolute";
    gpuText.style.top = "0";
    gpuText.style.left = "5px";
    gpuText.style.lineHeight = "15px";
    gpuText.style.textShadow = "1px 1px 1px #000";
    
    gpuBarContainer.appendChild(gpuBar);
    gpuBarContainer.appendChild(gpuText);
    gpuSection.appendChild(gpuLabel);
    gpuSection.appendChild(gpuBarContainer);
    content.appendChild(gpuSection);
    
    // VRAM Usage section
    const vramSection = document.createElement("div");
    vramSection.style.marginBottom = "8px";
    
    const vramLabel = document.createElement("div");
    vramLabel.textContent = "VRAM Usage:";
    vramLabel.style.marginBottom = "2px";
    
    const vramBarContainer = document.createElement("div");
    vramBarContainer.style.height = "15px";
    vramBarContainer.style.backgroundColor = "#333";
    vramBarContainer.style.borderRadius = "3px";
    vramBarContainer.style.position = "relative";
    
    const vramBar = document.createElement("div");
    vramBar.className = "amd-vram-bar";
    vramBar.style.height = "100%";
    vramBar.style.width = "0%";
    vramBar.style.backgroundColor = "#47a0ff";
    vramBar.style.borderRadius = "3px";
    vramBar.style.transition = "width 0.5s ease-out, background-color 0.3s";
    
    const vramText = document.createElement("div");
    vramText.className = "amd-vram-text";
    vramText.textContent = "0%";
    vramText.style.position = "absolute";
    vramText.style.top = "0";
    vramText.style.left = "5px";
    vramText.style.lineHeight = "15px";
    vramText.style.textShadow = "1px 1px 1px #000";
    
    vramBarContainer.appendChild(vramBar);
    vramBarContainer.appendChild(vramText);
    vramSection.appendChild(vramLabel);
    vramSection.appendChild(vramBarContainer);
    content.appendChild(vramSection);
    
    // Temperature section
    const tempSection = document.createElement("div");
    
    const tempLabel = document.createElement("div");
    tempLabel.textContent = "GPU Temperature:";
    tempLabel.style.marginBottom = "2px";
    
    const tempBarContainer = document.createElement("div");
    tempBarContainer.style.height = "15px";
    tempBarContainer.style.backgroundColor = "#333";
    tempBarContainer.style.borderRadius = "3px";
    tempBarContainer.style.position = "relative";
    
    const tempBar = document.createElement("div");
    tempBar.className = "amd-temp-bar";
    tempBar.style.height = "100%";
    tempBar.style.width = "0%";
    tempBar.style.backgroundColor = "#47a0ff";
    tempBar.style.borderRadius = "3px";
    tempBar.style.transition = "width 0.5s ease-out, background-color 0.3s";
    
    const tempText = document.createElement("div");
    tempText.className = "amd-temp-text";
    tempText.textContent = "0°C";
    tempText.style.position = "absolute";
    tempText.style.top = "0";
    tempText.style.left = "5px";
    tempText.style.lineHeight = "15px";
    tempText.style.textShadow = "1px 1px 1px #000";
    
    tempBarContainer.appendChild(tempBar);
    tempBarContainer.appendChild(tempText);
    tempSection.appendChild(tempLabel);
    tempSection.appendChild(tempBarContainer);
    content.appendChild(tempSection);
    
    // CPU Utilization section
    const cpuSection = document.createElement("div");
    cpuSection.style.marginBottom = "8px";

    const cpuLabel = document.createElement("div");
    cpuLabel.textContent = "CPU Utilization:";
    cpuLabel.style.marginBottom = "2px";

    const cpuBarContainer = document.createElement("div");
    cpuBarContainer.style.height = "15px";
    cpuBarContainer.style.backgroundColor = "#333";
    cpuBarContainer.style.borderRadius = "3px";
    cpuBarContainer.style.position = "relative";

    const cpuBar = document.createElement("div");
    cpuBar.className = "amd-cpu-utilization-bar";
    cpuBar.style.height = "100%";
    cpuBar.style.width = "0%";
    cpuBar.style.backgroundColor = "#47a0ff";
    cpuBar.style.borderRadius = "3px";
    cpuBar.style.transition = "width 0.5s ease-out, background-color 0.3s";

    const cpuText = document.createElement("div");
    cpuText.className = "amd-cpu-utilization-text";
    cpuText.textContent = "0%";
    cpuText.style.position = "absolute";
    cpuText.style.top = "0";
    cpuText.style.left = "5px";
    cpuText.style.lineHeight = "15px";
    cpuText.style.textShadow = "1px 1px 1px #000";

    cpuBarContainer.appendChild(cpuBar);
    cpuBarContainer.appendChild(cpuText);
    cpuSection.appendChild(cpuLabel);
    cpuSection.appendChild(cpuBarContainer);
    content.appendChild(cpuSection);

    // RAM Usage section (display in % and MB)
    const ramSection = document.createElement("div");
    ramSection.style.marginBottom = "8px";

    const ramLabel = document.createElement("div");
    ramLabel.textContent = "RAM Usage:";
    ramLabel.style.marginBottom = "2px";

    const ramBarContainer = document.createElement("div");
    ramBarContainer.style.height = "15px";
    ramBarContainer.style.backgroundColor = "#333";
    ramBarContainer.style.borderRadius = "3px";
    ramBarContainer.style.position = "relative";

    const ramBar = document.createElement("div");
    ramBar.className = "amd-ram-bar";
    ramBar.style.height = "100%";
    ramBar.style.width = "0%";
    ramBar.style.backgroundColor = "#47a0ff";
    ramBar.style.borderRadius = "3px";
    ramBar.style.transition = "width 0.5s ease-out, background-color 0.3s";

    const ramText = document.createElement("div");
    ramText.className = "amd-ram-text";
    ramText.textContent = "0%";
    ramText.style.position = "absolute";
    ramText.style.top = "0";
    ramText.style.left = "5px";
    ramText.style.lineHeight = "15px";
    ramText.style.textShadow = "1px 1px 1px #000";

    ramBarContainer.appendChild(ramBar);
    ramBarContainer.appendChild(ramText);
    ramSection.appendChild(ramLabel);
    ramSection.appendChild(ramBarContainer);
    content.appendChild(ramSection);

    // Collapse/close behavior
    collapseButton.addEventListener("click", () => {
        if (content.style.display === "none") {
            content.style.display = "";
            collapseButton.innerHTML = "−";
        } else {
            content.style.display = "none";
            collapseButton.innerHTML = "+";
        }
    });

    closeButton.addEventListener("click", () => {
        container.style.display = "none";
        localStorage.setItem("amd-gpu-monitor-closed", "1");
    });

    // Restore closed state
    const closed = localStorage.getItem("amd-gpu-monitor-closed");
    if (closed === "1") {
        container.style.display = "none";
    }

    // Show button to reopen if closed
    const showButton = document.createElement("button");
    showButton.textContent = "Show AMD GPU Monitor";
    showButton.style.position = "absolute";
    showButton.style.top = "5px";
    showButton.style.right = "5px";
    showButton.style.zIndex = "1000";
    showButton.style.display = "none";
    showButton.addEventListener("click", () => {
        container.style.display = "";
        showButton.style.display = "none";
        localStorage.removeItem("amd-gpu-monitor-closed");
    });
    
    document.body.appendChild(showButton);
    
    // Toggle showButton visibility based on monitor visibility
    const updateShowButtonVisibility = () => {
        if (container.style.display === "none") {
            showButton.style.display = "block";
        } else {
            showButton.style.display = "none";
        }
    };
    
    // Create a MutationObserver to watch for changes to container's display style
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "style") {
                updateShowButtonVisibility();
            }
        });
    });
    
    observer.observe(container, { attributes: true });
    
    // Initial visibility check
    updateShowButtonVisibility();
    
    return { container, gpuBar, gpuText, vramBar, vramText, tempBar, tempText, cpuBar, cpuText, ramBar, ramText };
};

// Update the monitor UI with new data
const updateMonitorUI = (monitor, data) => {
    // Check if we have GPU data
    if (!data || !data.gpus || data.gpus.length === 0) return;
    
    const gpu = data.gpus[0]; // Use the first GPU
    
    // Update GPU utilization
    if (monitor.gpuBar && monitor.gpuText) {
        const utilization = gpu.gpu_utilization || 0;
        monitor.gpuBar.style.width = `${utilization}%`;
        monitor.gpuText.textContent = `${utilization}%`;
        
        // Change color based on utilization
        if (utilization > 80) {
            monitor.gpuBar.style.backgroundColor = '#ff4d4d';  // Red for high
        } else if (utilization > 50) {
            monitor.gpuBar.style.backgroundColor = '#ffad33';  // Orange for medium
        } else {
            monitor.gpuBar.style.backgroundColor = '#47a0ff';  // Blue for low
        }
    }
    
    // Update VRAM usage
    if (monitor.vramBar && monitor.vramText) {
        const vramPercent = gpu.vram_used_percent || 0;
        const vramUsed = gpu.vram_used || 0;
        const vramTotal = gpu.vram_total || 0;
        monitor.vramBar.style.width = `${vramPercent}%`;
        monitor.vramText.textContent = `${vramPercent}% (${vramUsed}MB / ${vramTotal}MB)`;
        
        if (vramPercent > 90) {
            monitor.vramBar.style.backgroundColor = '#ff4d4d';  // Red for high
        } else if (vramPercent > 60) {
            monitor.vramBar.style.backgroundColor = '#ffad33';  // Orange for medium
        } else {
            monitor.vramBar.style.backgroundColor = '#47a0ff';  // Blue for low
        }
    }
    
    // Update temperature
    if (monitor.tempBar && monitor.tempText) {
        const temp = gpu.gpu_temperature || 0;
        
        // Assume max reasonable temp is 100°C for the progress bar
        const tempPercent = Math.min(temp, 100);
        monitor.tempBar.style.width = `${tempPercent}%`;
        monitor.tempText.textContent = `${temp}°C`;
        
        // Change color based on temperature
        if (temp > 80) {
            monitor.tempBar.style.backgroundColor = '#ff4d4d';  // Red for high
        } else if (temp > 60) {
            monitor.tempBar.style.backgroundColor = '#ffad33';  // Orange for medium
        } else {
            monitor.tempBar.style.backgroundColor = '#47a0ff';  // Blue for low
        }
    }

    // Update CPU utilization (from server)
    if (monitor.cpuBar && monitor.cpuText && data.cpu_utilization !== undefined) {
        const cpu = data.cpu_utilization || 0;
        monitor.cpuBar.style.width = `${cpu}%`;
        monitor.cpuText.textContent = `${cpu}%`;
        if (cpu > 80) {
            monitor.cpuBar.style.backgroundColor = '#ff4d4d';
        } else if (cpu > 50) {
            monitor.cpuBar.style.backgroundColor = '#ffad33';
        } else {
            monitor.cpuBar.style.backgroundColor = '#47a0ff';
        }
    }

    // Update RAM usage (from server; ram_total/ram_used in MB)
    if (monitor.ramBar && monitor.ramText && data.ram_used_percent !== undefined) {
        const ramPercent = data.ram_used_percent || 0;
        const ramUsedMB = data.ram_used || 0;
        const ramTotalMB = data.ram_total || 0;
        monitor.ramBar.style.width = `${ramPercent}%`;
        monitor.ramText.textContent = `${ramPercent}% (${ramUsedMB}MB / ${ramTotalMB}MB)`;
        if (ramPercent > 90) {
            monitor.ramBar.style.backgroundColor = '#ff4d4d';
        } else if (ramPercent > 70) {
            monitor.ramBar.style.backgroundColor = '#ffad33';
        } else {
            monitor.ramBar.style.backgroundColor = '#47a0ff';
        }
    }
};

// Main app function
const main = () => {
    // Create the monitor UI
    const monitor = createMonitorElement();
    document.body.appendChild(monitor.container);
    
    // Set up WebSocket listener for GPU updates
    api.addEventListener("amd_gpu_monitor", (event) => {
        updateMonitorUI(monitor, event.detail);
    });
};

// Wait for DOM to be loaded
app.registerExtension({
    name: "amd.gpu.monitor",
    async setup() {
        // Wait a bit for the UI to be fully loaded
        setTimeout(main, 1000);
    },
});
