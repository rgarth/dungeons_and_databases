# Dev Tools

## Avatar Testing Tool

A tool to test Ready Player Me avatar generation across all available D&D races.

### Features

- **Comprehensive Race Testing**: Tests avatar generation for all 12 D&D 5e races
- **Performance Monitoring**: Tracks generation success rates and response times
- **Error Analysis**: Identifies problematic race/class combinations
- **Batch Processing**: Generates multiple avatars efficiently

### Usage

1. **Start the development server**: `npm run dev`
2. **Navigate to the tool**: Go to `/dev-tools/avatar-test`
3. **Configure settings**:
   - Select target races (or test all)
   - Choose character classes to test
   - Set generation parameters
4. **Run tests**:
   - Click "🎮 Test All Races with Ready Player Me"
   - Monitor progress in real-time
   - Review results and error reports

### Output

- **Success rates** for each race/class combination
- **Ready Player Me performance** for each race
- **Error logs** with detailed failure reasons
- **Performance metrics** (response times, success rates)

### Troubleshooting

- **API Errors**: Check Ready Player Me API status and credentials
- **Rate Limiting**: Implement delays between requests if needed
- **Network Issues**: Verify internet connectivity and API endpoints

---

## Adding New Dev Tools

When adding new development tools:

1. **Place files in `dev-tools/`** directory
2. **Add production checks** to any API endpoints
3. **Document usage** in this README
4. **Test locally** before committing 