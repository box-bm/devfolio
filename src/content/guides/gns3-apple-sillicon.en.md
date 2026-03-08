---
title: "Running GNS3 on Apple Silicon"
description: "Step-by-step guide to install and configure GNS3 on Apple Silicon Macs (M1/M2/M3/M4) using VMware Fusion and the official ARM64 VM."
tags: ["gns3", "networking", "apple-silicon", "vmware", "guides"]
date: 2026-03-08T00:00:00-6:00
updatedDate: 2026-03-08T00:00:00-6:00
draft: false
---

# Running GNS3 on Apple Silicon

This guide documents how to install and configure GNS3 on a Mac with Apple Silicon. The traditional GNS3 VM does not work on these machines due to architecture incompatibility, but there is an official ARM64 solution that works well.

## Table of Contents

- [Understanding the Problem](#understanding-the-problem)
- [Prerequisites](#prerequisites)
- [Step 1 — Download the Correct Files](#step-1--download-the-correct-files)
- [Step 2 — Install VMware Fusion](#step-2--install-vmware-fusion)
- [Step 3 — Create the GNS3 VM](#step-3--create-the-gns3-vm)
- [Step 4 — Install GNS3](#step-4--install-gns3)
- [Step 5 — Connect GNS3 to the VM](#step-5--connect-gns3-to-the-vm)
- [Managing Users and Credentials](#managing-users-and-credentials)
- [Troubleshooting](#troubleshooting)
- [Known Limitations](#known-limitations)

## Understanding the Problem

If you tried running the standard GNS3 VM on your Apple Silicon Mac, you likely saw this error:

> **"This virtual machine cannot be powered on because it requires the X86 machine architecture, which is incompatible with this Arm machine architecture host."**

This happens because Apple Silicon chips use **ARM** architecture, while the traditional GNS3 VM is built for **x86/Intel**. They are fundamentally incompatible at the hardware level.

The solution is to use the official **ARM64 version** of the GNS3 VM together with VMware Fusion, which supports ARM virtualization on Apple Silicon.

## Prerequisites

- Mac with Apple Silicon
- macOS Ventura or later
- At least 5 GB of free disk space
- Internet connection

## Step 1 — Download the Correct Files

Go to the official GNS3 releases page on GitHub:
[https://github.com/GNS3/gns3-gui/releases](https://github.com/GNS3/gns3-gui/releases)

> the version that works for me is 3.0.4 but you should check for the latest stable release.

Download **exactly these two files** and make sure they are the **same version**:

| File                      | Description                      |
| ------------------------- | -------------------------------- |
| `GNS3-3.x.x.dmg`          | GNS3 desktop application for Mac |
| `GNS3.VM.ARM64.3.x.x.zip` | GNS3 VM for Apple Silicon        |

> ⚠️ Do **not** download `GNS3.VM.VirtualBox`, `GNS3.VM.VMware.Workstation`, or any `.ova` file — those are x86 builds and will produce the same architecture error.

> ⚠️ The GNS3 client and VM **must be the same version**. Mismatched versions will cause authentication failures.

## Step 2 — Install VMware Fusion

VMware Fusion is free for personal use.

1. Download it from: [https://www.vmware.com/products/fusion.html](https://www.vmware.com/products/fusion.html)
2. Install it normally by dragging to Applications
3. Register a free account if prompted

## Step 3 — Create the GNS3 VM

1. Unzip `GNS3.VM.ARM64.3.x.x.zip` — you will get two `.vmdk` disk files
2. Open **VMware Fusion**
3. Click **+** → **New**
4. Select **Create a custom virtual machine**
5. Choose operating system: **Linux → ARM Ubuntu 64-bit**
6. For the virtual disk, select **Use an existing virtual disk**
7. Choose the first `disk1.vmdk` file
8. Finish the wizard but **do not start the VM yet**
9. Open **Settings → Hard Disk** → **Add Device** → **Existing Hard Disk**
10. Add the second `disk2.vmdk` file
11. Set resources: **2048 MB RAM**, **2 vCPUs** (adjust based on your Mac's specs)

## Step 4 — Install GNS3

1. Open `GNS3-3.x.x.dmg`
2. Drag GNS3 to your **Applications** folder

> ⚠️ Make sure you install version **3.x**. Version 2.x uses a different authentication system (Basic Auth) and is **not compatible** with the 3.x VM, which uses JWT tokens. This will cause "Not authenticated" errors even with correct credentials.

## Step 5 — Connect GNS3 to the VM

Every time you want to use GNS3, follow this order:

```
1. Open VMware Fusion and start the GNS3 VM
2. Wait for the blue screen showing the VM's IP address
3. Open GNS3
```

To configure the connection:

1. Open **GNS3 → Preferences** (`Cmd + ,`)
2. Click **GNS3 VM** in the left panel
3. Enable **"Enable the GNS3 VM"**
4. Set **Virtualization engine** to **VMware Fusion**
5. Click **Refresh** — GNS3 should detect the VM automatically
6. Click **Apply → OK**

The **GNS3 VM** entry in the Servers Summary panel should turn **green** ✅.

## Managing Users and Credentials

GNS3 3.x manages authentication through a web interface. To configure users:

1. With the VM running, open your browser and navigate to `http://<VM_IP_ADDRESS>`
2. Click the **⋮** (three dots) icon in the top right corner
3. Go to **Users** → select the **admin** user
4. Set or update the password as needed

The default credentials after a fresh install are `admin / admin`, but it is recommended to change them.

## Troubleshooting

### The server appears gray in GNS3

- Make sure the VM is running in VMware Fusion before opening GNS3
- Go to **Preferences → GNS3 VM** and click **Refresh**
- Verify the IP shown matches the one on the VM's blue screen

### The VM's IP address changes on every restart

The VM uses DHCP by default, so the IP may change between sessions. You can set a static IP by editing `/etc/netplan/90_gns3vm_static_netcfg.yaml` inside the VM, or simply click **Refresh** in GNS3 preferences each time.

### "Not authenticated" error

This usually means the GNS3 client version does not match the VM version. Verify both are running **version 3.x**. If versions match, reset the admin password through the Web UI at `http://<VM_IP>`.

### KVM support available: False

This is **expected** on Apple Silicon with VMware Fusion. KVM is a Linux virtualization feature not available in this setup. It does not affect basic GNS3 functionality.

## Known Limitations

- KVM is not available, which limits nested virtualization
- Dynamips-based devices (older Cisco IOS) may have reduced performance
- Docker containers inside GNS3 require ARM64-compatible images
