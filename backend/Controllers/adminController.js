import PlayerModel from '../models/Admin.js';

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
      const io = req.app.get('socketio'); // Access io
      io.emit('playerAdded', newPlayer); // Broadcast to all clients
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
        io.emit('playerUpdated', updatedPlayer); // Broadcast update
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
      if (success) {
        const io = req.app.get('socketio');
        io.emit('playerDeleted', { Player_ID: id }); // Broadcast deletion
        res.json({ message: 'Player deleted' });
      } else {
        res.status(404).json({ error: 'Player not found' });
      }
    } catch (error) {
      console.error('Error deleting player:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default AdminController;