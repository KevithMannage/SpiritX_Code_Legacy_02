import PlayerModel from '../Models/Admin.js';

class AdminController {
  static async getAllPlayers(req, res) {
    try {
      const players = await PlayerModel.getAllPlayers();
      res.json(players);
    } catch (error) {
      console.error('Error fetching players:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createPlayer(req, res) {
    try {
      const playerData = req.body;
      const result = await PlayerModel.createPlayer(playerData);
      const newPlayer = { Player_ID: result.Player_ID, ...playerData };
      const io = req.app.get('socketio');
      io.emit('playerAdded', newPlayer);
      console.log('Emitted playerAdded:', newPlayer); // Debug log
      res.status(201).json({ message: 'Player created', Player_ID: result.Player_ID });
    } catch (error) {
      console.error('Error creating player:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updatePlayer(req, res) {
    try {
      const { id } = req.params;
      const playerData = req.body;
      const success = await PlayerModel.updatePlayer(id, playerData);
      if (success) {
        const updatedPlayer = { Player_ID: id, ...playerData };
        const io = req.app.get('socketio');
        io.emit('playerUpdated', updatedPlayer);
        console.log('Emitted playerUpdated:', updatedPlayer); // Debug log
        res.json({ message: 'Player updated' });
      } else {
        res.status(404).json({ error: 'Player not found' });
      }
    } catch (error) {
      console.error('Error updating player:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deletePlayer(req, res) {
    try {
      const { id } = req.params;
      const success = await PlayerModel.deletePlayer(id);
      console.log('Delete success:', success);
      if (success) {
        const io = req.app.get('socketio');
        io.emit('playerDeleted', { Player_ID: id });
        console.log('Emitted playerDeleted:', { Player_ID: id });
        res.json({ message: 'Player deleted' });
      } else {
        res.status(404).json({ error: 'Player not found' });
      }
    } catch (error) {
      console.error('Error deleting player:', error.message);
      if (error.message.includes('referenced in another table')) {
        res.status(409).json({ error: 'Cannot delete player because it is referenced in another table. Please remove related records first.' });
      } else {
        res.status(500).json({ error: 'Internal server error', details: error.message });
      }
    }
  }
  static async getTopPerformers(req, res){
    try {
      const topRunScorers = await PlayerModel.getTopRunScorers();
      const topWicketTakers = await PlayerModel.getTopWicketTakers();
      const totalRunsAndWickets=await PlayerModel.getTotalRunsAndWickets()
      
      const responseData = {
        success: true,
        data: {
          topRunScorers,
          topWicketTakers,
          totalRunsAndWickets
        }
      };
  
      // Get Socket.IO instance from app
      const io = req.app.get('socketio');
      
      // Emit the top performers data to all connected clients
      io.emit('topPerformersUpdated', responseData.data);
  
      // Send response to the requesting client
      res.json(responseData);
    } catch (error) {
      console.error('Error fetching top performers:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching top performers',
        error: error.message
      });
    }
  }
  static startRealTimeUpdates(io) {
    PlayerModel.checkForUpdates(io);
  }
  
}

export default AdminController;