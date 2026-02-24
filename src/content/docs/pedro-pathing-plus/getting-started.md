---
title: Getting Started
description: Learn how to configure and run your first path with Pedro Pathing Plus.
---

Welcome to Pedro Pathing Plus! This guide will walk you through setting up your robot configuration and running your first autonomous path.

## Prerequisites

Before starting, ensure you have completed the [Installation Guide](/pedro-pathing-plus/installation/) and have the necessary dependencies in your project.

## 1. Configuration (Constants)

To use Pedro Pathing effectively, you need to configure your robot's physical properties and tuning constants. This is typically done in a `Constants` class.

Here is a template `Constants.java` file to get you started. You will need to tune the PIDF coefficients for your specific drivetrain later.

```java
package org.firstinspires.ftc.teamcode.pedroPathing;

import com.pedropathing.follower.FollowerConstants;
import com.pedropathing.util.CustomPIDFCoefficients;

public class Constants {
    public static FollowerConstants followerConstants = new FollowerConstants.Builder()
            .setMass(13.5) // Robot mass in kg
            .setXMovement(true) // Whether the robot can move in the X direction (mecanum)
            .setYMovement(true) // Whether the robot can move in the Y direction (mecanum)
            .setDrivePIDF(new CustomPIDFCoefficients(0.015, 0, 0.0005, 0))
            .setHeadingPIDF(new CustomPIDFCoefficients(0.02, 0, 0.001, 0))
            .setDriveFeedForward(0.01)
            .setHeadingFeedForward(0.01)
            .build();
}
```

> **Note:** The above values are placeholders. You must tune your robot for optimal performance. Refer to the tuning guide (coming soon) or community resources for tuning instructions.

## 2. Your First Autonomous

Now let's create a simple LinearOpMode that moves the robot forward 24 inches. This example uses the `Follower` class directly.

Create a new file `HelloPedro.java` in your teamcode folder:

```java
package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;

import com.pedropathing.follower.Follower;
import com.pedropathing.geometry.BezierLine;
import com.pedropathing.geometry.Pose;
import com.pedropathing.paths.Path;

// Import your Constants class
import org.firstinspires.ftc.teamcode.pedroPathing.Constants;

@Autonomous(name = "Hello Pedro", group = "Examples")
public class HelloPedro extends LinearOpMode {

    private Follower follower;
    private Path forwardPath;

    @Override
    public void runOpMode() {
        // Initialize the follower with the hardware map
        // Note: Ensure your Constants class is correctly set up as Pedro Pathing
        // often looks for it or requires it to be passed.
        follower = new Follower(hardwareMap);

        // Define our starting pose (x, y, heading in radians)
        Pose startPose = new Pose(0, 0, 0);
        Pose endPose = new Pose(24, 0, 0);

        follower.setStartingPose(startPose);

        // Build a simple straight path
        // Moving from (0,0) to (24,0) - forward 24 inches
        // BezierLine can be constructed with two Poses
        forwardPath = new Path(new BezierLine(startPose, endPose));
        forwardPath.setConstantHeadingInterpolation(0);

        telemetry.addData("Status", "Initialized");
        telemetry.update();

        waitForStart();

        // Start following the path
        follower.followPath(forwardPath);

        while (opModeIsActive()) {
            // Essential: Update the follower loop
            follower.update();

            // Provide feedback
            telemetry.addData("X", follower.getPose().getX());
            telemetry.addData("Y", follower.getPose().getY());
            telemetry.addData("Heading", follower.getPose().getHeading());
            telemetry.addData("Is Busy", follower.isBusy());
            telemetry.update();
        }
    }
}
```

### Key Concepts

- **`Follower`**: The main class that handles robot movement and path following.
- **`Pose`**: Represents the robot's position (x, y) and heading (rotation).
- **`Path`**: A single segment of movement. In this example, a straight line (`BezierLine`).
- **`update()`**: This method must be called in every loop iteration to calculate motor powers and update the robot's state.

## Next Steps

- Explore **[Command-Based Programming](/pedro-pathing-plus/command-based/)** for more structured code.
- Use the **[Visualizer](/pedro-pathing-plus-visualizer/getting-started/)** to design complex paths visually.
