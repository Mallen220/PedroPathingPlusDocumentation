---
title: Getting Started
description: Your first autonomous program with Pedro Pathing Plus.
---

Welcome to Pedro Pathing Plus! This guide will walk you through creating your first autonomous program using the library. We'll cover the basics of the `Follower` class, defining a simple path, and running it on your robot.

## Prerequisites

Before you begin, ensure you have:
1.  Installed Pedro Pathing Plus in your project (see [Installation](/pedro-pathing-plus/installation/)).
2.  Configured your robot's hardware map (motors, sensors) in the Driver Station or `FtcRobotController`.

## The Follower Class

The core of Pedro Pathing is the `Follower` class. It handles all the path following logic, localization updates, and motor control. You typically create one instance of `Follower` per OpMode (or wrap it in a Subsystem for Command-Based programming).

## Your First Path

Here is a complete example of a simple `LinearOpMode` that moves the robot forward 10 inches.

```java
package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;

import com.pedropathing.follower.Follower;
import com.pedropathing.geometry.BezierLine;
import com.pedropathing.geometry.Point;
import com.pedropathing.geometry.Pose;
import com.pedropathing.paths.Path;
import com.pedropathing.paths.PathBuilder;
import com.pedropathing.paths.PathChain;

@Autonomous(name = "My First Path")
public class MyFirstPath extends LinearOpMode {

    private Follower follower;

    @Override
    public void runOpMode() {
        // 1. Initialize the Follower
        follower = new Follower(hardwareMap);

        // 2. Set the starting pose (x, y, heading)
        // Adjust these coordinates to match your robot's starting position on the field.
        Pose startPose = new Pose(0, 0, 0);
        follower.setStartingPose(startPose);

        // 3. Create a PathChain
        // This example creates a simple line moving forward 10 inches.
        PathChain path = follower.pathBuilder()
            .addPath(new Path(new BezierLine(new Point(0, 0), new Point(10, 0))))
            .setConstantHeadingInterpolation(0)
            .build();

        telemetry.addData("Status", "Initialized");
        telemetry.update();

        waitForStart();

        // 4. Follow the path
        follower.followPath(path);

        // 5. Main Loop
        while (opModeIsActive()) {
            // CRITICAL: Update the follower every loop cycle
            follower.update();

            // Feedback
            follower.telemetryDebug(telemetry);
        }
    }
}
```

### Breaking it Down

1.  **Initialize**: `new Follower(hardwareMap)` sets up the library with your robot's hardware configuration.
2.  **Start Pose**: `setStartingPose` tells the robot where it is on the field. This is crucial for accurate path following.
3.  **Path Building**: We use `follower.pathBuilder()` to create a `PathChain`. This fluent API allows you to chain multiple path segments together. Here, we add a single line segment using a `BezierLine`.
4.  **Follow Path**: `follower.followPath(path)` starts the movement. The robot will autonomously drive along the defined path.
5.  **Update Loop**: `follower.update()` must be called in every iteration of the loop. This method calculates the robot's position and adjusts motor powers to stay on path.

## Using the Visualizer

While writing paths manually is useful for simple tests, the recommended workflow is to design your paths using the [Pedro Pathing Visualizer](/pedro-pathing-plus-visualizer/getting-started/).

1.  **Design**: Create your path in the Visualizer web interface.
2.  **Export**: Click the "Export" button and select "Java OpMode".
3.  **Copy**: Paste the generated code into a new file in your project.
4.  **Run**: The exported code is a ready-to-run OpMode!

This approach saves time and allows you to visualize complex curves before running them on the robot.

## Next Steps

- Explore [Command-Based Programming](/pedro-pathing-plus/command-based/) for more structured code.
- Learn about [Live View](/pedro-pathing-plus/live-view/) to see your robot's position in real-time.
