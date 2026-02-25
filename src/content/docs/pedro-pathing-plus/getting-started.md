---
title: Getting Started
description: Your first autonomous program with Pedro Pathing Plus.
---

Welcome to Pedro Pathing Plus! This guide will walk you through creating your first autonomous program using the library.

:::caution[Deprecation Warning]
Manual path coding (writing `PathBuilder` code by hand) is **deprecated** and will be removed in version **2.2.0**. We strongly recommend using the [Pedro Pathing Visualizer](/pedro-pathing-plus-visualizer/getting-started/) for all path creation.
:::

## Prerequisites

Before you begin, ensure you have:
1.  Installed Pedro Pathing Plus in your project (see [Installation](/pedro-pathing-plus/installation/)).
2.  Configured your robot's hardware map (motors, sensors) in the Driver Station or `FtcRobotController`.

## The Recommended Workflow

The modern Pedro Pathing Plus workflow is "Visualizer-First":
1.  **Design** your path in the Visualizer web interface.
2.  **Export** the path as a complete Java OpMode.
3.  **Run** the generated code on your robot.

This approach eliminates the need to manually write complex geometry code and ensures your paths are visualized correctly before you even touch the robot.

## Creating Your First Path

### 1. Open the Visualizer
Go to the [Pedro Pathing Visualizer](https://github.com/Mallen220/PedroPathingPlusVisualizer) (or your hosted instance).

### 2. Draw a Path
1.  Click the **+** (Add Path) button or press `P`.
2.  Click on the field to place your starting point.
3.  Click again to place the end point.
4.  Drag the control handles to shape the curve if desired.

### 3. Export the OpMode
1.  Click the **Export** button in the top right corner.
2.  Ensure **"Java OpMode"** is selected.
3.  Check **"Generate Full Class"**.
4.  Enter your team's package name (e.g., `org.firstinspires.ftc.teamcode`).
5.  Click **Copy to Clipboard**.

### 4. Paste into Android Studio
1.  Open your project in Android Studio.
2.  Create a new Java class file in your `teamcode` directory (e.g., `MyFirstPath.java`).
3.  Paste the code you copied.
4.  Build and deploy to your robot!

## Understanding the Generated Code

The exported code handles the heavy lifting for you. Here are the key components you'll see:

### The Follower
The `Follower` class is the heart of the library. It is initialized in the `runOpMode` (or `init`) method:

```java
follower = new Follower(hardwareMap);
follower.setStartingPose(startPose);
```

### Path Chains
Your drawn paths are converted into `PathChain` objects. These define the geometry your robot will follow.

```java
public void buildPaths() {
    path0 = follower.pathBuilder()
        .addPath(new BezierLine(new Point(10, 10, Point.CARTESIAN), new Point(30, 30, Point.CARTESIAN)))
        .setConstantHeadingInterpolation(0)
        .build();
}
```

### The State Machine
The OpMode uses a `switch` statement (or similar state machine logic) to progress through your path segments.

```java
switch (pathState) {
    case 0:
        follower.followPath(path0);
        setPathState(1);
        break;
    case 1:
        // Wait for the path to finish, then move to the next step
        if (!follower.isBusy()) {
            setPathState(2);
        }
        break;
    // ...
}
```

### The Update Loop
Crucially, the `follower.update()` method is called in every loop cycle. This keeps the robot on track.

```java
follower.update();
```

## Next Steps

- Explore [Command-Based Programming](/pedro-pathing-plus/command-based/) for integrating paths into a larger robot framework.
- Learn about [Live View](/pedro-pathing-plus/live-view/) to see your robot's position in real-time.
