---
title: Live View
description: Learn how to stream real-time robot telemetry to the Pedro Pathing Visualizer.
---

The `PedroPathingLiveView` class is a utility that allows you to broadcast your robot's pose in real-time. This can be used to visualize your robot's movement on a dashboard or the Pedro Pathing Visualizer during autonomous or teleop routines.

## Overview

`PedroPathingLiveView` creates a lightweight TCP server on your robot controller that listens on port `8888`. When a client (like the Visualizer) connects, it streams the current robot pose (x, y, and heading) as JSON data.

- **Port:** 8888
- **Protocol:** TCP
- **Format:** JSON `{"x": <x>, "y": <y>, "heading": <heading>}`
- **Update Rate:** ~20Hz (50ms interval)

## Usage

To use the Live View, you need to integrate it into your OpMode's lifecycle methods: `init()`, `start()`, and `stop()`.

### Basic Setup

Here is a complete example of how to use `PedroPathingLiveView` in an Autonomous OpMode.

```java
package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.pedropathing.follower.Follower;
import com.pedropathing.geometry.Pose;
import com.pedropathingplus.PedroPathingLiveView;

@Autonomous(name = "Example Auto with Live View")
public class ExampleAuto extends LinearOpMode {
    private Follower follower;

    @Override
    public void runOpMode() {
        // Initialize your Follower as usual
        follower = new Follower(hardwareMap);

        // 1. Start the Live View server
        PedroPathingLiveView.getInstance().start();

        // 2. Link the Follower so Live View can read the pose
        PedroPathingLiveView.getInstance().setFollower(follower);

        telemetry.addData("Status", "Initialized");
        telemetry.update();

        waitForStart();

        // Your autonomous logic here...
        // follower.followPath(...);

        while (opModeIsActive()) {
            follower.update();

            // Optional: Add telemetry to Driver Station
            telemetry.addData("X", follower.getPose().getX());
            telemetry.addData("Y", follower.getPose().getY());
            telemetry.addData("Heading", follower.getPose().getHeading());
            telemetry.update();
        }

        // 3. Disable Live View when the OpMode stops to prevent memory leaks
        PedroPathingLiveView.getInstance().disable();
        // optionally stop the server entirely if no other opmode needs it,
        // though typically we let it run in the background.
        // PedroPathingLiveView.getInstance().stop();
    }
}
```

### Command-Based Setup

If you are using a command-based framework (like FTCLib or the one built into PedroPathingPlus), you can integrate the Live View into your subsystem's `periodic()` method or initialize it in your OpMode.

Here is an example using a `MecanumDrive` subsystem:

```java
public class MecanumDrive extends SubsystemBase {
    private final Follower follower;

    public MecanumDrive(HardwareMap hardwareMap) {
        follower = new Follower(hardwareMap);

        // Start and link Live View in the constructor
        PedroPathingLiveView.getInstance().start();
        PedroPathingLiveView.getInstance().setFollower(follower);
    }

    @Override
    public void periodic() {
        // Update the follower each loop
        follower.update();

        // You don't need to manually update Live View here;
        // it runs on its own thread and polls the follower.
    }

    public void stop() {
         // Disable Live View when the subsystem is no longer needed
         PedroPathingLiveView.getInstance().disable();
    }
}
```

And in your Command-Based OpMode:

```java
@Autonomous(name = "Command Auto")
public class CommandAuto extends CommandOpMode {
    private MecanumDrive drive;

    @Override
    public void initialize() {
        drive = new MecanumDrive(hardwareMap);
        // ... register other subsystems and schedule commands
    }

    @Override
    public void runOpMode() {
        initialize();

        waitForStart();

        // Run the scheduler
        while (opModeIsActive()) {
            run();
        }

        // Clean up
        drive.stop();
        reset();
    }
}
```

### Key Methods

#### `start()`
Starts the background server thread if it's not already running. This method is safe to call multiple times; if the server is already running, it does nothing.

```java
PedroPathingLiveView.getInstance().start();
```

#### `setFollower(Follower follower)`
Links the `Follower` instance to the Live View. The server will automatically query this follower for the robot's current pose.

```java
PedroPathingLiveView.getInstance().setFollower(follower);
```

#### `disable()`
Disables the telemetry stream by clearing the reference to the follower. This should be called in your OpMode's cleanup phase (e.g., after the loop finishes) to ensure the server doesn't try to access a follower that has been destroyed.

```java
PedroPathingLiveView.getInstance().disable();
```

#### `setPoseProvider(Supplier<Pose> provider)`
For advanced users, you can provide a custom supplier if you are not using the standard `Follower` class or want to manipulate the data before sending it.

```java
PedroPathingLiveView.getInstance().setPoseProvider(() -> {
    // Return a custom Pose object
    return new Pose(10, 20, Math.toRadians(90));
});
```

## Connecting the Visualizer

Once your robot is running the OpMode:
1. Ensure your computer is connected to the robot's Wi-Fi network.
2. Open the **Pedro Pathing Visualizer**.
3. The visualizer should automatically detect the broadcast if configured, or you may need to use a compatible plugin/client to connect to the robot's IP address on port `8888`.

> **Note:** Ensure your firewall allows connections on port 8888.
