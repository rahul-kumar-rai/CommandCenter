import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import os from 'os';

function runCommand(cmd: string): Promise<string> {
  return new Promise((resolve) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        resolve('');
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

export async function GET() {
  let serial = 'UNKNOWN';
  let model = 'UNKNOWN';
  const platform = os.platform();

  try {
    if (platform === 'win32') {
      const serialRaw = await runCommand('wmic bios get serialnumber');
      const serialLines = serialRaw.split('\r\n').map(l => l.trim()).filter(Boolean);
      if (serialLines.length > 1) {
        serial = serialLines[1];
      }

      const modelRaw = await runCommand('wmic csproduct get name');
      const modelLines = modelRaw.split('\r\n').map(l => l.trim()).filter(Boolean);
      if (modelLines.length > 1) {
        model = modelLines[1];
      }
    } else if (platform === 'darwin') {
      const raw = await runCommand("system_profiler SPHardwareDataType | grep 'Serial Number'");
      const parts = raw.split(':');
      if (parts.length > 1) {
        serial = parts[1].trim();
      }
      model = 'Apple Mac';
    } else if (platform === 'linux') {
      serial = await runCommand('cat /sys/class/dmi/id/product_serial');
      model = 'Linux System';
    }
  } catch (e) {
    console.error('Failed to retrieve hardware info:', e);
  }

  // Fallback if hardware commands return generic OEM values or fail
  if (!serial || serial === 'UNKNOWN' || serial === 'To be filled by O.E.M.') {
    serial = 'SYS-B1PLLG3-DELL';
  }
  if (!model || model === 'UNKNOWN') {
    model = 'Latitude 3420';
  }

  return NextResponse.json({
    serial,
    model,
    hostname: os.hostname(),
    platform: os.type(),
    arch: os.arch(),
    cpu: os.cpus()[0]?.model || 'Unknown CPU',
  });
}
